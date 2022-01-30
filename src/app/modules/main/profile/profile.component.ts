import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public data: ProfileData = {
    fullName: '',
    description: '',
    phoneNumber: '',
  };

  public currentProfile: string = '';

  constructor(
    private profileService : ProfileService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
  }

  ngOnInit(): void {
    this.router.routeReuseStrategy.shouldReuseRoute = function() { return false; };
    this.getCurrentProfile();
        
  }


  public checkSameUser() : boolean {
    return this.currentProfile == localStorage.getItem('Username')!;
  }

  public getCurrentProfile() {
    this.route.params.subscribe(params => {
      this.currentProfile = params['username']
      
    });
    
    this.profileService.getProfile(this.currentProfile).subscribe({
      next: (result) => {
        this.data = result;
        console.log(this.currentProfile);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  public searchProfile(searchInput: string) {
    this.profileService.getProfile(searchInput).subscribe({
      next: (result) => {
        this.router.navigate(['profile', searchInput]);
      },
      error: (error) => {
        console.error(error);
        document.getElementById("message")!.innerText = "Searched user does not exist"
      }
    })
  }
}

export interface ProfileData {
  fullName: string;
  description: string;
  phoneNumber: string;

}