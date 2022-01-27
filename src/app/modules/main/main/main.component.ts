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

  public sidenavActive: boolean = false;
  
  constructor(
    private router: Router,
    private authService: AuthService,
  ) { 
    
  }

  ngOnInit(): void {
    if(this.router.url == '/') {

      this.router.navigate(['/home'])
    }
  }

  
  public verifyLoggedIn(): boolean {
    return localStorage.getItem('Token') != null;
  }

  public goToLogin(){
    this.router.navigate(['/auth/login']);
  }

  public logout() : void {
    this.router.navigate(['/home']); 
    localStorage.removeItem('Role');
    localStorage.removeItem('Token');
    localStorage.removeItem('UserId');
  }

  public toggleSidenav() {
    this.sidenavActive = !this.sidenavActive;
  }
}
