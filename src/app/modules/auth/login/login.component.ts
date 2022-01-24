import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm : FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  constructor(
    private router: Router
  ) { 
      
  }

  get username(): AbstractControl {
    return this.loginForm.get('username') as AbstractControl;
  }
  get password(): AbstractControl {
    return this.loginForm.get('password') as AbstractControl;
  }

  ngOnInit(): void {
  }

  public login(): void {
    console.log(this.loginForm.value);
    localStorage.setItem('Role', 'Admin');
    this.router.navigate(['/main']);
  }
}
