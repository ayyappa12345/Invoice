import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms'
import {FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { ProductRoutingModule } from './product/product/product-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UsersComponent } from './users/users.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { AuthInterceptor } from './users/auth-interceptor';
import { AuthGuard } from './user/auth.guard';
import { ModalModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
 
    UsersComponent,
    LoginComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  providers: [{provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true}, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
