import { Injectable } from '@angular/core';
import { Users } from '../users/users.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { expressionType } from '@angular/compiler/src/output/output_ast';
import { stringify } from '@angular/core/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
users:Users;
restUrl='http://localhost:3000/api';
isAuthenticated=false;
isAuthUpdated=new Subject<boolean>();
token:string;
Time:any;
private userId:string;

  constructor(private http:HttpClient, private router:Router) { }
getUserId(){
  return this.userId;
}
getLoggedUsername(){
 return localStorage.getItem("username");
}
  getAuth(){
  return this.isAuthenticated;
}
  getIsAuth(){
  return this.isAuthUpdated.asObservable();
}
  addUser(user:Users){
   return this.http.post(`${this.restUrl}/register`, user)
  }
  logoutUser(){
    this.clearTime();
    this.isAuthenticated=false;
    this.isAuthUpdated.next(false);
    this.userId=null;
    this.removeLocalStorage();
  }
saveAutoAuth(){
  const authStorage=this.getLocalStorage();
  const now=new Date();
  const expires=authStorage.expires.getTime()-now.getTime();
  if(expires > 0){
    
    this.isAuthenticated=true;
    this.isAuthUpdated.next(true);
    this.token=authStorage.token;
    this.userId=authStorage.userid;
    this.setTime(expires);
    this.getLoggedUsername();
  }
  else{
    this.isAuthenticated=false;
    this.isAuthUpdated.next(true);
    this.token=null;
  }
}

  setLocalStorage(token:string, expiration:Date, userid:string, username:string){
    localStorage.setItem("token", token);
    localStorage.setItem("userid", userid);
    localStorage.setItem("username", username);
    localStorage.setItem("expires", expiration.toISOString())
  }
  

  getLocalStorage(){
  const expiration=localStorage.getItem("expires");
  const token=localStorage.getItem("token");
  const username=localStorage.getItem("username");
  const userid=localStorage.getItem("userid");
  if(!token && !expiration && !username){
    return;
  }
  else{
    return {
      token:token,
      username:username,
      userid:userid,
      expires:new Date(expiration)
    }
  }

  }
  removeLocalStorage(){
   localStorage.removeItem("token");
   localStorage.removeItem("expires");
   localStorage.removeItem("username");
   localStorage.removeItem("userid");

  }
  setTime(duration){
   this.Time=setTimeout(()=>{
      this.logoutUser();
    }, duration)
  }

  clearTime(){
    clearTimeout(this.Time);
  }

  loginUser(email:string, password:string){
    const user={email:email, password:password};
     this.http.post<{message:string,userid:string, username:string, token:string, expires:number}>(`${this.restUrl}/login`, user)
     .subscribe(res=>{
      if(res){
       const token=res.token;
        this.token=token;
        const now=new Date();
        if(token){
          this.isAuthenticated=true;
          this.isAuthUpdated.next(true);
          const expires=res.expires * 1000;
          this.setTime(expires);
          const expiration=new Date(now.getTime() + expires);
          const username=res.username;
          const userid=res.userid;
          this.setLocalStorage(token, expiration, userid, username);
          this.userId=res.userid;
          this.router.navigate(['/list']);
        }
       
  
      }
      else{
        this.isAuthenticated=false;
        this.isAuthUpdated.next(false);
      }
    }, err=>{
      
      //this.showErrorMessage=err.error.message;
      console.log(err);
    })
  }

getToken(){
  return this.token;
}

}
