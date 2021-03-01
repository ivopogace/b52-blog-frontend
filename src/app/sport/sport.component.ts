import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../_services/token-storage.service';
import {PostService} from '../_services/post.service';
import {CommentService} from '../_services/comment.service';
import {Profile} from '../models/profile.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

const REST_API_SERVER = 'http://localhost:8080/api/public/comments';
const REST_API_SERVER1 = 'http://localhost:8080/api/public/posts';
@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  loadedPosts = [];
  loadedCommentsById = [];
  loadedComments = [];
  loadedCommentsByPostId10 = [];
  loadedCommentsByPostId11 = [];
  loadedCommentsByPostId12 = [];
  isLoggedIn: boolean;
  currentUser: Profile;
  postid: any;
  date: Date;
  commentForm: FormGroup;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private router: Router, private  http: HttpClient, private tokenStorageService: TokenStorageService, private postService: PostService, private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe(posts => this.loadedPosts = posts);
    // this.commentService.fetchComments().subscribe(comments => this.loadedComments = comments);
    this.commentService.fetchCommentsByPostsID(10).subscribe( comments => this.loadedCommentsByPostId10 = comments);
    this.commentService.fetchCommentsByPostsID(11).subscribe( comments => this.loadedCommentsByPostId11 = comments);
    this.commentService.fetchCommentsByPostsID(12).subscribe( comments => this.loadedCommentsByPostId12 = comments);
    this.currentUser = this.tokenStorageService.getUser();

    this.commentForm = this.fb.group({
      postId: ['', Validators.required],
      author: ['', Validators.required],
      message1: ['', Validators.required],
    });
  }



  // tslint:disable-next-line:typedef
  onCreateComment(newComment) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    // Send Http request
    if (this.isLoggedIn && newComment.comment.length !== 0){
      this.commentService
        .addComment(newComment)
        .subscribe(comment => this.loadedComments.push(comment)
        );
    }

  }

  // tslint:disable-next-line:typedef
  onCreateCommentByPostId(postId) {
    const comment = {
      postsId: this.commentForm.value.postsId,
      author: this.commentForm.value.author,
      comment: this.commentForm.value.message1,
    };
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    // Send Http request
    if (this.isLoggedIn){
      this.commentService
        .addCommentByPostId(postId, comment)
        .subscribe(  newComment => {
            this.loadedCommentsById.push(...[newComment]);
            this.ngOnInit();
          }
        );
    }
  }


  // tslint:disable-next-line:typedef
  onDelete(id) {
    this.commentService.deleteCommentById(id).subscribe(r => this.ngOnInit());
  }

}
