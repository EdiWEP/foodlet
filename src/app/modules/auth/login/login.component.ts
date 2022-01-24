import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss','../auth.style.scss']
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

  ngOnInit(): void {
  }

  public goToRegister() : void {
    console.log("hello");
    this.router.navigate(['/auth/register']);
  }

  public login(): void {
    console.log(this.loginForm.value);
    localStorage.setItem('Role', 'Admin');
    this.router.navigate(['/main']);
  }
}
