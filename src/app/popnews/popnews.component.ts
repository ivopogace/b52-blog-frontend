import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../_services/token-storage.service';
import {PostService} from '../_services/post.service';
import {CommentService} from '../_services/comment.service';
import {Profile} from '../models/profile.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  commentForm: FormGroup;
  searchText: string;

  // tslint:disable-next-line:max-line-length
  constructor(private fb: FormBuilder, private router: Router, private  http: HttpClient, private tokenStorageService: TokenStorageService, private postService: PostService, private commentService: CommentService) {
  }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe(posts => this.loadedPosts = posts);
    // this.commentService.fetchComments().subscribe(comments => this.loadedComments = comments);
    this.commentService.fetchCommentsByPostsID(7).subscribe( comments => this.loadedCommentsByPostId7 = comments);
    this.commentService.fetchCommentsByPostsID(8).subscribe( comments => this.loadedCommentsByPostId8 = comments);
    this.commentService.fetchCommentsByPostsID(9).subscribe( comments => this.loadedCommentsByPostId9 = comments);
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
      this.loadedCommentsByPostId7 = this.loadedCommentsByPostId7.filter(res => res.comment.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase()) );
      // tslint:disable-next-line:max-line-length
      this.loadedCommentsByPostId8 = this.loadedCommentsByPostId8.filter(res => res.comment.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase()) );
      // tslint:disable-next-line:max-line-length
      this.loadedCommentsByPostId9 = this.loadedCommentsByPostId9.filter(res => res.comment.toLocaleLowerCase().match(this.searchText.toLocaleLowerCase()) );
    } else if (this.searchText === '') {
      this.ngOnInit();
    }
  }

  // tslint:disable-next-line:typedef
  onKeydown(event) {
    this.ngOnInit();
  }




}
