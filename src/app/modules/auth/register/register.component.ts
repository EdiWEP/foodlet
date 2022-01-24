import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../auth.style.scss']
})
export class RegisterComponent implements OnInit {


  public registerForm : FormGroup = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(
    private router: Router
  ) { 
      
  }
  ngOnInit(): void {
  }

 
  public goToLogin() : void {
    this.router.navigate(['/auth/login']);
  }

  public register(): void {
    console.log(this.registerForm.value);
  }

}
