import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

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
    private router: Router,
    private authService: AuthService,
    private dataService: DataService
  ) { 
      
  }

  ngOnInit(): void {
  }

  public goToRegister() : void {
    console.log("hello");
    this.router.navigate(['/auth/register']);
  }

  public login(): void {
    this.authService.login(this.loginForm.value).subscribe(
      {
        next: (result) => {
          
          var username = this.loginForm.value.username;
          localStorage.setItem('Token', result.token);
          localStorage.setItem('UserId', result.userId);
          localStorage.setItem('Role', result.role);
          if(!username.includes('@') && !username.includes('.')) {
            this.dataService.setUsername(username);
            localStorage.setItem('Username', username);
          } 
          this.router.navigate(['']);
        },
        error: (error) => {
          if(error.status == 400) {
            document.getElementById("message")!.innerText = "Incorrect email/username or password";
          }
          else {
            document.getElementById("message")!.innerText = "An error occoured, please try again";
          }
        }
      });
    
  }
}
