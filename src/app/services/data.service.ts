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
  
}
