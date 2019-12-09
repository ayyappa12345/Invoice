import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../shared/post.model';
import { Subscription } from 'rxjs';
import { PostService } from '../shared/post.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

constructor(private postservice:PostService, private authService:AuthService, private router:Router) { }
userAuthenticated=false;
posts:Post[]=[];
postlistSubs:Subscription;
userid:string;
  ngOnInit() {
this.userid=this.authService.getUserId();
this.userAuthenticated=this.authService.isAuthenticated;
this.authService.getIsAuth().subscribe(isAuthenticated=>{
  this.userAuthenticated=isAuthenticated
})


    this.postlistSubs=this.postservice.getUpdatedPost().subscribe(res=>{
      this.posts=res;
      
    })
    this.postservice.getPosts();
    
  }
onEdit(postId){
  this.router.navigate(['/edit', postId]);
  console.log(postId);
}
onDelete(postId){
  this.postservice.DeletePost(postId);
  alert("Post Deleted");
}

ngOnDestroy(){
  this.postlistSubs.unsubscribe();
}


}
