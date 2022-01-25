import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl : string = 'https://localhost:44386/api/authentication/'

  constructor(
    private http : HttpClient
  ) { }


  public login(formData : any) : Observable<any> {

    var credentials = {
      username : null,
      email: null,
      password: formData.password
    };

    if(formData.username.includes('@') && formData.username.includes('.')) {
      credentials.email = formData.username;
    }
    else {
      credentials.username = formData.username;
    }

    return this.http.post(this.apiUrl + 'login', credentials);
  }

  public register(formData : any) : Observable<any> {

    return this.http.post(this.apiUrl + 'register', formData, {responseType: 'text'});
  }
}
