import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
userisAthenticated=false;
username;
  constructor(private authService:AuthService) { }

  ngOnInit() {
this.username=this.authService.getLoggedUsername();

this.userisAthenticated=this.authService.getAuth()

    this.authService.getIsAuth().subscribe(isAthenticated=>{
      this.userisAthenticated=isAthenticated;
      this.username=this.authService.getLoggedUsername();
      
    })
  }
  logout(){
    this.authService.logoutUser()
  }
}
