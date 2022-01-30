import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Ingredient, Recipe } from '../modules/main/interfaces';
import { IngredientService } from './ingredient.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private usernameSource = new BehaviorSubject<string>('');

  public username = this.usernameSource.asObservable();
  public apiUrl : string = "https://localhost:44386/api/authentication/";

  constructor(
    private ingredService : IngredientService,
    private recipeService : RecipeService,
  ) {
    if (!this.usernameSource.getValue()) {
      console.log('h');
      this.usernameSource.next(localStorage.getItem('Username')!);
    }
   }
  
  public setUsername(username: string) {
    this.usernameSource.next(username);
  }

  // public addRecipe(recipe : Recipe) {
  //   var recipes = this.recipesSource.getValue();
  //   recipes.push(recipe);
  //   this.recipesSource.next(recipes);
  // }

  // public addIngredient(ingredient : Ingredient) {
  //   var ingredients = this.ingredientsSource.getValue();
  //   ingredients.push(ingredient);
  //   this.ingredientsSource.next(ingredients);
  // }

  // public removeRecipe(id : string) {
  //   var recipes = this.recipesSource.getValue();
  //   recipes = recipes.filter((recipe) => recipe.id != id);
  //   this.recipesSource.next(recipes);
  // }

  // public removeIngredient(id : string) {
  //   var ingredients = this.ingredientsSource.getValue();
  //   ingredients = ingredients.filter((ingredient) => ingredient.id != id);
  //   this.ingredientsSource.next(ingredients);
  // }

  // public updateIngredient(ingredient : Ingredient) {
  //   this.removeIngredient(ingredient.id!);
  //   this.addIngredient(ingredient);
  // }

  // public updateRecipe(recipe : Recipe) {
  //   this.removeRecipe(recipe.id);
  //   this.addRecipe(recipe);
  // }

  
  
}
