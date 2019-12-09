import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userAuthenticate=false;
  constructor(private authService:AuthService){}
ngOnInit(){
  this.authService.saveAutoAuth()
}
}
