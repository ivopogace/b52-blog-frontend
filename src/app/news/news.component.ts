import {Component, Input, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {PostService} from '../_services/post.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CommentService} from '../_services/comment.service';
import {Profile} from '../models/profile.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentModel} from '../models/comment.model';
import {EventEmitter} from '@angular/core';

const REST_API_SERVER = 'http://localhost:8080/api/public/comments';


@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  loadedPosts = [];
  loadedCommentsById = [];
  loadedComments = [];
  loadedCommentsByPostId1 = [];
  loadedCommentsByPostId2 = [];
  loadedCommentsByPostId3 = [];
  isLoggedIn: boolean;
  currentUser: Profile;
  date: Date;
  commentForm: FormGroup;
  searchText: string;

  // tslint:disable-next-line:max-line-length
  constructor( private fb: FormBuilder, private router: Router, private  http: HttpClient, private tokenStorageService: TokenStorageService, private commentService: CommentService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe(posts => this.loadedPosts = posts);
    this.commentService.fetchCommentsByPostsID(1).subscribe( comments => this.loadedCommentsByPostId1 = comments);
    this.commentService.fetchCommentsByPostsID(2).subscribe( comments => this.loadedCommentsByPostId2 = comments);
    this.commentService.fetchCommentsByPostsID(3).subscribe( comments => this.loadedCommentsByPostId3 = comments);
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
    if (this.isLoggedIn && newComment.comment.length !== 0) {
      this.commentService
        .addComment(newComment)
        .subscribe(
          comment => {
            this.loadedComments.push(comment);
            this.router.navigate(['/home/news']);
          });
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
    if (this.isLoggedIn && comment.comment.length > 0){
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

  // tslint:disable-next-line:typedef
  search() {
    if (this.searchText !== ''){
      // tslint:disable-next-line:max-line-length
      this.loadedCommentsByPostId1 = this.loadedCommentsByPostId1.filter(res => res.comment.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase()) );
      // tslint:disable-next-line:max-line-length
      this.loadedCommentsByPostId2 = this.loadedCommentsByPostId2.filter(res => res.comment.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase()) );
      // tslint:disable-next-line:max-line-length
      this.loadedCommentsByPostId3 = this.loadedCommentsByPostId3.filter(res => res.comment.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase()) );
    } else if (this.searchText === '') {
      this.ngOnInit();
    }
  }

  // tslint:disable-next-line:typedef
  onKeydown(event) {
    this.ngOnInit();
  }



}
