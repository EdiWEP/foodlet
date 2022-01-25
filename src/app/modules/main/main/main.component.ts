import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }


  public logout() : void {
    localStorage.removeItem('Role');
    localStorage.removeItem('Token');
    localStorage.removeItem('UserId');
    this.router.navigate(['/auth/login']);
  }
}
