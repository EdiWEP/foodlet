using FoodletAPI.Entities;
using FoodletAPI.Interfaces.Repositories;
using FoodletAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FoodletAPI.Repositories
{
    public class IngredientRepository : BaseRepository<Ingredient>, IIngredientRepository
    {
       
        public IngredientRepository(AppDbContext dbcontext) : base(dbcontext) { }

        public void CreateRangeFromList(List<Ingredient> ingredients)
        {
            _set.AddRange(ingredients);
        }

        public async Task<List<Ingredient>> GetAllDefault()
        {
            return await _set.Where(x => x.UserId == null).ToListAsync();
        }

        public async Task<List<Ingredient>> GetFromIdList(List<string> listOfIds)
        {
            return await _set.Where(x => listOfIds.Contains(x.Id)).ToListAsync();
        }

        public async Task<List<Ingredient>> GetByUserId(string userId)
        {
            return await _set.Where(x => x.UserId == null || x.UserId == userId).ToListAsync();
        }

        public async Task<Ingredient> GetByName(string name)
        {
            return await _set.Where(x => x.Name == name.ToLower()).FirstOrDefaultAsync();
        }

        public async Task<List<Ingredient>> GetAllOfUser(string userId)
        {
            return await _set.Where(x => x.UserId == userId).ToListAsync();
        }

        public async Task<Ingredient> GetByModel(IngredientModel model)
        {
            return await _set.Where(x => x.UserId == model.UserId && x.Calsperg == model.Calsperg && x.Name == model.Name && x.Protein == model.Protein && x.Fat == model.Fat && x.Carbs == model.Carbs).FirstOrDefaultAsync();
        }

        public async Task<List<Ingredient>> SearchByName(string term, string userId)
        {

            return await _set.Where(x => x.Name.Contains(term.ToLower()) && (x.UserId == null || x.UserId == userId)).ToListAsync();
        }
    }
}
