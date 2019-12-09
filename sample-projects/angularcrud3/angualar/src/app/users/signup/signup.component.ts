import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Users } from '../users.model';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signUpForm:FormGroup;
  users:Users;
  showSuccessMessage;
  showErrorMessage;
  constructor(private fb:FormBuilder, private authservice:AuthService) { }

  ngOnInit() {
    
    this.resetForm(this.signUpForm);
    this.signUpForm=this.fb.group({
      "fullname":['', Validators.required],
      "email":['', Validators.required],
      "password":['', Validators.required]
    })
  }
  onSubmit(form:FormGroup){
    this.authservice.addUser(form.value).subscribe(res=>{
      this.showErrorMessage=false;
      this.showSuccessMessage="Saved Successfully",
      setTimeout(()=>{ this.showSuccessMessage= false}, 4000);
      //this.resetForm(form);
    },err=>{
      this.showErrorMessage=err.error.message;
      console.log(err.error.message);
    })

  }
  resetForm(form:FormGroup){
    if(form != null){
      form.reset();
    }
    else{
    
    }
  }

}
