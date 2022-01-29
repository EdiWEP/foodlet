import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { DataService } from './data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl : string = 'https://localhost:44386/api/authentication/'

  private username : string = '';
  
  constructor(
    private http : HttpClient,
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
      this.username = formData.username;
    }

    return this.http.post(this.apiUrl + 'login', credentials);
  }

  public register(formData : any) : Observable<any> {

    return this.http.post(this.apiUrl + 'register', formData, {responseType: 'text'});
  }

  public checkLogin() {
    return this.http.get(this.apiUrl + 'check', {headers: this.getAuthHeaders()});
  }

  public deleteStorage() {
    localStorage.removeItem('Role');
    localStorage.removeItem('Token');
    localStorage.removeItem('UserId');
  }

  public getUsername() : string {
    return this.username;
  }
  
  public getAuthHeaders() : HttpHeaders {
    const token = localStorage.getItem('Token');
    var headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return headers;
  }
}
