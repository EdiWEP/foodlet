import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl : string = 'https://localhost:44386/api/account/'

  constructor(
    private http : HttpClient,
    private authService : AuthService
  ) 
    { 

    }

  public getProfile(username : string) : Observable<any> {
    
    return this.http.get(
      this.apiUrl + 'profile/' + username,
        {headers: this.authService.getAuthHeaders()});
  }
  
  public updateProfile(model : Profile) : Observable<any> {

    return this.http.put(
      this.apiUrl + 'update/profile', model, 
        {headers: this.authService.getAuthHeaders()});
  }

  
}

export interface Profile {
  userId: string;
  fullName: string;
  phoneNumber: string;
  description: string;
}
