import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../_services/token-storage.service';
import {PostService} from '../_services/post.service';
import {CommentService} from '../_services/comment.service';
import {Profile} from '../models/profile.model';

const REST_API_SERVER = 'http://localhost:8080/api/public/comments';
const REST_API_SERVER1 = 'http://localhost:8080/api/public/posts';
@Component({
  selector: 'app-popnews',
  templateUrl: './popnews.component.html',
  styleUrls: ['./popnews.component.css']
})
export class PopnewsComponent implements OnInit {
  // @ViewChild('postForm') commentForm: NgForm;
  loadedPosts = [];
  loadedCommentsById = [];
  loadedComments = [];
  loadedCommentsByPostId7 = [];
  loadedCommentsByPostId8 = [];
  loadedCommentsByPostId9 = [];
  isLoggedIn: boolean;
  currentUser: Profile;
  postid: any;
  date: Date;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private  http: HttpClient, private tokenStorageService: TokenStorageService, private postService: PostService, private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe(posts => this.loadedPosts = posts);
    // this.commentService.fetchComments().subscribe(comments => this.loadedComments = comments);
    this.commentService.fetchCommentsByPostsID(7).subscribe( comments => this.loadedCommentsByPostId7 = comments);
    this.commentService.fetchCommentsByPostsID(8).subscribe( comments => this.loadedCommentsByPostId8 = comments);
    this.commentService.fetchCommentsByPostsID(9).subscribe( comments => this.loadedCommentsByPostId9 = comments);
    this.currentUser = this.tokenStorageService.getUser();
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
  onCreateCommentByPostId(postId, comment) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    // Send Http request
    if (this.isLoggedIn && comment.comment.length > 0){
      this.commentService
        .addCommentByPostId(postId, comment)
        .subscribe(newComment => {
          this.loadedCommentsById.push(postId, newComment);
          console.log(this.loadedCommentsById);
        });
    }
  }


  // // tslint:disable-next-line:typedef
  // onCreateCommentByPostId(postId, newComment) {
  //   this.isLoggedIn = !!this.tokenStorageService.getToken();
  //   // Send Http request
  //   if (this.isLoggedIn && newComment.comment.length > 0){
  //     this.commentService
  //       .addCommentByPostId(postId, newComment)
  //       .subscribe(comment => {
  //         this.loadedCommentsByPostId7.push(comment);
  //         console.log(comment);
  //         console.log('---------------------------------');
  //         // tslint:disable-next-line:align
  //       }); return this.loadedCommentsByPostId7;
  //   }
  // }



  // tslint:disable-next-line:typedef
    onDelete(id) {
    if (true){
      this.commentService.deleteCommentById(id);

    }
  }


  // tslint:disable-next-line:typedef
  liveFetchTheNewlyCreatedComment($event: MouseEvent) {
    // console.log(this.postid = this.loadedPosts.map(res => this.postid = res.id) );
  }
}
