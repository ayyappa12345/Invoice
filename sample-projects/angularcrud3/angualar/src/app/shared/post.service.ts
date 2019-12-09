import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
post:Post={
  id:null,
  title:'',
  content:'',
  creator:'',
  image:null,
 
};
posts:Post[]=[];
postsUpdatedSub=new Subject<Post[]>();

baseurl="http://localhost:3000/api";
  constructor(private http:HttpClient) { }
getUpdatedPost(){
  return this.postsUpdatedSub.asObservable();
}
  getPosts(){
  this.http.get<{message:string, response:any}>(`${this.baseurl}/getposts`)
  .pipe(map((postData)=>{
    return postData.response.map(post=>{
      const {_id:id, content, title, creator, image} = post;
      return {
        id,
        title,
        content,
        creator,
        image
      }
    })

  }))
  .subscribe(transformeddata=>{
    this.posts=transformeddata;
    this.postsUpdatedSub.next([...this.posts])
  })
}

getPost(postid){
 return this.http.get<{messages:string, response:any}>(`${this.baseurl}/getpost/${postid}`);

}


addPost(title:string, content:string, image:File){
const postData=new FormData();
postData.append("title", title);
postData.append("content", content);
postData.append("image", image);
    this.http.post<{message:string, post:Post}>(`${this.baseurl}/addposts`, postData)
    .subscribe(res=>{
      const post:Post={
        id:res.post.id,
        title:title,
        content:content,
        creator:null,
        image:res.post.image
      }
      this.postsUpdatedSub.next([...this.posts])
    })
  }
EditPost(post:Post){
  this.http.put<{message:string, response:any}>(`${this.baseurl}/updatepost/${post.id}`,post).subscribe(res=>{
    console.log(res)
    this.postsUpdatedSub.next([...this.posts]);
  })
  
}
DeletePost(postId){
  this.http.delete(`${this.baseurl}/deletepost/${postId}`).subscribe(res=>{
    this.getPosts();
    
  })
}

}
