import { NotFoundError } from './../common/not-found-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { AppError } from '../common/app-error';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts;

  constructor(private service: PostService) { 
  }

  ngOnInit(){
    this.service.getPosts()
    .subscribe(
      response => {
        this.posts = response;
      }, 
      error => {
        alert('An unexpected error occured.');
        console.log(error);
      });
  }
  
  createPost(input: HTMLInputElement) {
    let post = {title: input.value};
    input.value = '';
    
    this.service.createPost(post)
    .subscribe(
      response => {
        post['id'] = response.json().id;
        this.posts.splice(0, 0, post);
        console.log(post);
      }, 
      (error: Response) => {
        if(error.status === 400) {
          alert('Not found error.');
        } else {
          alert('An unexpected error occured.');
          console.log(error);
        }
      });
  }

  updatePost(post){
    this.service.updatePost(post)
      .subscribe(
        response => {
          console.log(response);
        }, 
        error => {
          alert('An unexpected error occured.');
          console.log(error);
        });
  }

  deletePost(post){
    this.service.deletePost(355)
      .subscribe(
        response => {
          let index = this.posts.indexOf(post);
          this.posts.splice(index, 1);
        }, 
        (error: AppError) => {
          if(error instanceof NotFoundError) {
            alert('This post has already been deleted.');
          } else {
            alert('An unexpected error occured.');
            console.log(error);
          }
        });
  }

}
