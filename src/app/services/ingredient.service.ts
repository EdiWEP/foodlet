import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../modules/main/interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl : string = 'https://localhost:44386/api/ingredient/'

  constructor(
    
    private http : HttpClient,
    private authService : AuthService,

  ) { }

  public getIngredients() : Observable<any> {

    return this.http.get(this.apiUrl + 'all', {headers: this.authService.getAuthHeaders()});
  }

  public addIngredient(ingredient : Ingredient) : Observable<any> {

    //return this.http.post(this.apiUrl + 'add', { body: {ingredient}, headers: this.authService.getAuthHeaders()});
    return this.http.post(this.apiUrl + 'add', ingredient, {headers:this.authService.getAuthHeaders(), responseType: 'text'});
  }

  public deleteIngredient(id: string) : Observable<any> {

    return this.http.delete(this.apiUrl + 'delete/' + id, {headers: this.authService.getAuthHeaders(), responseType: 'text'});
  }
  
  public updateIngredient(ingredient: Ingredient) : Observable<any> {

    return this.http.put(this.apiUrl + 'update', ingredient, {headers: this.authService.getAuthHeaders(), responseType: 'text'});
  }
}

