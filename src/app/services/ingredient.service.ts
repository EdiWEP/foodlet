import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  private apiUrl : string = 'https://localhost:5001/api/ingredient/'

  constructor(
    
    private http : HttpClient,
    private authService : AuthService,

  ) { }

  public getIngredients() : Observable<any> {

    return this.http.get(this.apiUrl + 'all', {headers: this.authService.getAuthHeaders()});
  }
}
