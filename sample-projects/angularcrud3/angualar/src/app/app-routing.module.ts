import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './users/signin/signin.component';
import { SignupComponent } from './users/signup/signup.component';
import { UsersComponent } from './users/users.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  {path:'login', component:SigninComponent},
  {path:'register', component:SignupComponent},
  {path:'create', component:CreatePostComponent, canActivate:[AuthGuard]},
  {path:'edit/:id', component:CreatePostComponent, canActivate:[AuthGuard]},
  {path:'list', component:PostListComponent},
  {path:'', redirectTo:'login', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
