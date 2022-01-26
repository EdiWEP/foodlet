import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { NgIf } from '@angular/common';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(
    private router: Router,
    private authService: AuthService,
  ) { 
    // router.events.pipe(filter(e => e instanceof NavigationStart))
    //   .subscribe((event) => { 

    //     this.authService.checkLogin().subscribe(
    //       {
    //         next: (result) => {
    //         },
    //         error: (error) => {
    //           console.log(error.status);
    //           console.error(error);
    //           this.logout();

    //         }
    //       }
    //     )
    // });
  }

  ngOnInit(): void {
  }

  
  public verifyLoggedIn(): boolean {
    return localStorage.getItem('Token') != null;
  }

  public goToLogin(){
    this.router.navigate(['/auth/login']);
  }

  public logout() : void {
    this.goToLogin();  
    localStorage.removeItem('Role');
    localStorage.removeItem('Token');
    localStorage.removeItem('UserId');
  }
}
