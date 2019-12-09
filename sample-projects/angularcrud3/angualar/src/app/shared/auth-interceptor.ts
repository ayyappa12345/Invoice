import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService:AuthService){}
    intercept(req:HttpRequest<any>, next: HttpHandler){
    const token=this.authService.getToken();
    console.log("From interceptor"+token);
    if(token){
       return next.handle(
        req.clone({
            headers:req.headers.append("Authorization", "Bearer "+token)
        })
       )
    }
      return next.handle(req)
    }

}