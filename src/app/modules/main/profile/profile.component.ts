import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public data!: ProfileData;
  
  constructor(
    private profileService : ProfileService,
  ) { }

  ngOnInit(): void {
    this.profileService.getProfile(localStorage.getItem('UserId')!).subscribe({
      next: (result) => {
        this.data = result;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}

export interface ProfileData {
  fullName: string;
  description: string;
  phoneNumber: string;

}