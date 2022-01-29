import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { MaterialModule } from '../../material/material.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public usernameSubscription!: Subscription;

  public username: string = '';
  constructor(
    private router: Router,
    private dataService: DataService
  ) { }

  
  ngOnInit(): void {
    this.usernameSubscription = this.dataService.username.subscribe(username => this.username = username);
  }


  
}
