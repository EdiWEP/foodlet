import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import {MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    var url = route.url.join();

    return new Observable<boolean>(obs => {
      this.authService.checkLogin().subscribe({
        next: (result) => {
          obs.next(true);
        },
        error: (error) => {
          console.error(error);
          this.authService.deleteStorage();
          if( url === '' || url == 'home' ) {
            console.log('f');
            obs.next(true);
          } else {
              obs.next(false);
              this.snackBar.openFromComponent(SnackbarComponent, { duration: 2500, panelClass: ['snackbar-container'] })
          }      
        }
      });
    }); 
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}
