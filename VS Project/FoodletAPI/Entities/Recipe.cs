using FoodletAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodletAPI.Entities
{
    public class Recipe
    {
        public string Id { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }

        public int NumberOfIngredients { get; set; }
        public int ServingSize { get; set; }

        public float Calsperg { get; set; }
        public float Fat { get; set; }
        public float Carbs { get; set; }
        public float Protein { get; set; }

        public virtual User User { get; set; }
        public virtual ICollection<RecipeIngredient> RecipeIngredients { get; set; }

        public Recipe()
        {
            Id = Guid.NewGuid().ToString();
            Name = "defaultName";
            Calsperg = 0.0f;
            Fat = 0.0f;
            Carbs = 0.0f;
            Protein = 0.0f;
            NumberOfIngredients = 0;
            ServingSize = 0;
            RecipeIngredients = null;
        }

        public void UpdateFromRecipe(Recipe recipe)
        {
            Name = recipe.Name;
            Calsperg = recipe.Calsperg;
            Fat = recipe.Fat;
            Carbs = recipe.Carbs;
            Protein = recipe.Protein;
            NumberOfIngredients = recipe.NumberOfIngredients;
            ServingSize = recipe.ServingSize;
        }
    }
}
