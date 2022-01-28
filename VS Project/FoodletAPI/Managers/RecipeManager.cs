using FoodletAPI.Entities;
using FoodletAPI.Interfaces.Managers;
using FoodletAPI.Interfaces.Repositories;
using FoodletAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodletAPI.Managers
{
    public class RecipeManager : IRecipeManager
    {

        private readonly IRecipeRepository _repo;
        private readonly IIngredientRepository _ingredRepo;

        public RecipeManager(IRecipeRepository recipeRepo, IIngredientRepository ingredRepo)
        {
            _repo = recipeRepo;
            _ingredRepo = ingredRepo;
        }

        public async Task<List<ReturnRecipeModel>> GetAll()
        {
            var recipeEntities = await _repo.GetAllWithIngredients();

            var recipes = new List<ReturnRecipeModel>();

            foreach (var entity in recipeEntities)
            {
                recipes.Add(new ReturnRecipeModel(entity));
            }

            return recipes;
        }

        public async Task<ReturnRecipeModel> GetById(string id)
        {
            var entity = await _repo.GetByIdWithIngredients(id);

            if (entity != null)
            {
                var recipe = new ReturnRecipeModel(entity);
                return recipe;
            }
            else
            {
                return null;
            }
        }

        public async Task<List<ReturnRecipeModel>> GetAllFromUser(string userId)
        {
            var entities = await _repo.GetFromUserWithIngredients(userId);

            var recipes = new List<ReturnRecipeModel>();

            foreach(var entity in entities)
            {
                recipes.Add(new ReturnRecipeModel(entity));
            }

            return recipes;
        }

        public async Task<string> GetUserId(string id)
        {
            var entity = await _repo.GetById(id);

            if (entity == null) return null;
            return entity.UserId;
        }

        public async Task<bool> AddRecipe(AddRecipeModel addModel) 
        {
            var newRecipe = await CreateRecipe(addModel);

            
            var newIngredients = new List<RecipeIngredient>();

            foreach(var ingredient in addModel.Ingredients)
            {
                newIngredients.Add(new RecipeIngredient(newRecipe.Id, ingredient));
            }

            _repo.Create(newRecipe);
            _repo.AddRecipeIngredients(newIngredients);

            return await _repo.SaveChanges();
        }

        public async Task<int> Delete(string id)
        {
            var recipe = await _repo.GetById(id);

            if (recipe == null)
            {
                return 404;
            }

            _repo.DeleteRecipeIngredients(id);
            _repo.Delete(recipe);

            if (await _repo.SaveChanges())
            {
                return 200;
            }
            else
            {
                return 500;
            }
        }

        public async Task<int> Update(UpdateRecipeModel model)
        {
            var recipe = await _repo.GetById(model.Id);

            if (recipe == null)
            {
                return 404;
            }

            var newRecipe = await CreateRecipe(model);

            recipe.UpdateFromRecipe(newRecipe);

            var newIngredients = new List<RecipeIngredient>();

            foreach (var ingredient in model.Ingredients)
            {
                newIngredients.Add(new RecipeIngredient(model.Id, ingredient));
            }

            _repo.UpdateRecipeIngredients(model.Id, newIngredients);
            
            _repo.Update(recipe);

            if (await _repo.SaveChanges())
            {
                return 200;
            }
            else
            {
                return 500;
            }
        }


        private async Task<Recipe> CreateRecipe(AddRecipeModel model)
        {
            var newRecipe = new Recipe();
            newRecipe.Name = model.Name.Trim().ToLower();
            newRecipe.NumberOfIngredients = model.NumberOfIngredients;
            newRecipe.ServingSize = model.ServingSize;
            newRecipe.UserId = model.UserId;

            var ingredientIds = new List<string>();

            foreach(var ingredient in model.Ingredients)
            {
                ingredientIds.Add(ingredient.IngredientId);
            }

            var ingredients = await _ingredRepo.GetFromIdList(ingredientIds);

            float calories = 0 , fat = 0 , protein = 0 , carbs = 0;
            int totalGrams = 0;

            foreach(var ingredient in ingredients)
            {
                int grams = 0;
                foreach(var ing in model.Ingredients)
                {
                    if(ing.IngredientId == ingredient.Id)
                    {
                        grams = ing.Grams;
                        break;
                    }
                }
                totalGrams += grams;
                calories += ingredient.Calsperg * grams;
                fat += ingredient.Fat * grams;
                protein += ingredient.Protein * grams;
                carbs += ingredient.Carbs * grams;


            }

            newRecipe.Calsperg = calories / totalGrams;
            newRecipe.Fat = fat / totalGrams;
            newRecipe.Carbs = carbs / totalGrams;
            newRecipe.Protein = protein / totalGrams;


            return newRecipe;

        }
    }
}
