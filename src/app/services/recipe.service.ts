import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl : string = 'https://localhost:44386/api/recipe/'

  constructor(
    
    private http : HttpClient,
    private authService : AuthService,

  ) { }

  public getRecipes() : Observable<any> {

    return this.http.get(this.apiUrl + 'all', {headers: this.authService.getAuthHeaders()});
  }

  public addRecipe(recipe : Recipe) : Observable<any> {

    //return this.http.post(this.apiUrl + 'add', { body: {recipe}, headers: this.authService.getAuthHeaders()});
    return this.http.post(this.apiUrl + 'add', recipe, {headers:this.authService.getAuthHeaders(), responseType: 'text'});
  }

  public deleteRecipe(id: string) : Observable<any> {

    return this.http.delete(this.apiUrl + 'delete/' + id, {headers: this.authService.getAuthHeaders(), responseType: 'text'});
  }
  
  public updateRecipe(recipe: Recipe) : Observable<any> {

    return this.http.put(this.apiUrl + 'update', recipe, {headers: this.authService.getAuthHeaders(), responseType: 'text'});
  }
}

export interface Recipe {
  id: string;
  name: string;
  calsperg: number;
  carbs: number;
  protein: number;
  fat: number;
  userId: string;
  numberOfIngredients: number;
  servingSize: number;
  ingredients: [{
    grams: number;
    ingredientId: string;
  }]
}