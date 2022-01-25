import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private router: Router,
    private authService: AuthService,
  ) { 
      
  }
  ngOnInit(): void {
  }

 
  public goToLogin() : void {
    this.router.navigate(['/auth/login']);
  }

  public register(): void {
    
    if(this.registerForm.value.username == null) {
      document.getElementById('message')!.innerText = "Please enter a username"
      return;
    }
    
    if(this.registerForm.value.email == null) {
      document.getElementById('message')!.innerText = "Please enter an email"
      return;
    }
    
    if(this.registerForm.value.password == null) {
      document.getElementById('message')!.innerText = "Please enter a password"
      return;
    }

    this.authService.register(this.registerForm.value).subscribe(
      {
        next: (result) => {
          this.registerForm.reset();
          document.getElementById('message')!.style.color = "limegreen";
          document.getElementById('message')!.style.fontWeight = "bold";
          document.getElementById('message')!.innerText = "Successfully registered, you can now login";
//          this.registerForm.setValue({email: '', username: '', password: ''});
        },
        error: (error) => {
          console.log(error);
          document.getElementById('message')!.innerText = error.error;
        }
      }
    );
  }

}
