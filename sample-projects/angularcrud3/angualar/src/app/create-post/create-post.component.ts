import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {mimeType} from './mime-type-validator';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  CreatePost:FormGroup;
  mode:string="Create"
  id:string;
  imagePreview:string;
  constructor(private postservice:PostService,private router:Router,private route:ActivatedRoute, private fb:FormBuilder) { }

  ngOnInit() {
  this.route.paramMap.subscribe((params)=>{
  if(params.has("id")){
    const id=params.get("id");
    this.id=id;
    this.postservice.getPost(id).subscribe(res=>{
      this.CreatePost.setValue({
        id:res.response._id,
        title:res.response.title,
        content:res.response.content,
        

      })
      console.log(res);
    })
    this.mode="Edit";
  }
  else{
    this.mode="Create"
  }
})

    this.resetForm(this.CreatePost);
    this.CreatePost=this.fb.group({
      "id":null,
      "title":['', Validators.required],
      "content":['', Validators.required],
      "image":[null, {Validators:[Validators.required]}]
    })
  }
  onChangeImage(event:Event){
    const file=(event.target as HTMLInputElement).files[0]
    this.CreatePost.patchValue({"image":file});
    this.CreatePost.get("image").updateValueAndValidity();
    const reader=new FileReader()
    reader.onload=()=>{
      this.imagePreview=reader.result as string
    }
    reader.readAsDataURL(file);
  }
  onSubmit(form){
    if(this.mode==="Create"){
      this.postservice.addPost(form.value.title, form.value.content, form.value.image);
      this.postservice.getPosts
      this.router.navigate(['/list'])
    
    }
    else{
      this.postservice.EditPost(form.value);
      this.postservice.getPosts
      this.router.navigate(['/list'])
    }
  }
resetForm(form:FormGroup){
  if(form != null){
    form.reset();
  }
  else{
    this.postservice.post={
      id:null,
      title:'',
      content:'',
      creator:'',
      image:null,
    }
  }
}
}
