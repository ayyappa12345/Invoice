import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signInForm:FormGroup;
  isAuthenticated;
  showErrorMessage;
  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService) { }

  ngOnInit() {
    this.resetForm(this.signInForm);
    this.signInForm=this.fb.group({
      "email":['', Validators.required],
      "password":['', Validators.required]
    })
  }
  onSubmit(form:FormGroup){
    debugger;
    this.authService.loginUser(form.value.email, form.value.password)
    
  }

  resetForm(form:FormGroup){
    if(form != null){
      form.reset();
    }
    else{
    
    }
  }
}
