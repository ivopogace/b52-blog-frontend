import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {PostService} from '../_services/post.service';
import {Router} from '@angular/router';
import {CommentService} from '../_services/comment.service';
import {Profile} from '../models/profile.model';

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
  postid: any;
  date: Date;


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private  http: HttpClient, private tokenStorageService: TokenStorageService, private commentService: CommentService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe(posts => this.loadedPosts = posts);
    this.commentService.fetchCommentsByPostsID(1).subscribe( comments => this.loadedCommentsByPostId1 = comments);
    this.commentService.fetchCommentsByPostsID(2).subscribe( comments => this.loadedCommentsByPostId2 = comments);
    this.commentService.fetchCommentsByPostsID(3).subscribe( comments => this.loadedCommentsByPostId3 = comments);
    this.currentUser = this.tokenStorageService.getUser();

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
  onCreateCommentByPostId(postId, comment) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    // Send Http request
    if (this.isLoggedIn && comment.comment.length > 0){
      this.commentService
        .addCommentByPostId(postId, comment)
        .subscribe(newComment => {
          this.loadedCommentsById.push(postId, newComment);
          console.log(this.loadedCommentsById);
          this.ngOnInit();
        });
    }
  }


  // tslint:disable-next-line:typedef
  onDelete(id) {
    this.commentService.deleteCommentById(id);
    this.ngOnInit();
  }


}
