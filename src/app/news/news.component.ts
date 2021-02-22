import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';
import {PostService} from '../_services/post.service';
import {Post} from '../home/post.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {CommentService} from '../_services/comment.service';

const REST_API_SERVER = 'http://localhost:8080/api/public/comments';
const REST_API_SERVER2 = 'http://localhost:8080/api/public/posts/${id}/comments';
const REST_API_SERVER1 = 'http://localhost:8080/api/public/posts';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  loadedPosts = [];
  loadedComments = [];
  isLoggedIn: boolean;
  currentUser: any;
  currentComment = null;
  private id: any;


  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private  http: HttpClient, private tokenStorageService: TokenStorageService, private commentService: CommentService, private postService: PostService) {
  }

  ngOnInit(): void {
    this.postService.fetchPosts().subscribe(posts => this.loadedPosts = posts);
    this.commentService.fetchComments().subscribe(comments => this.loadedComments = comments);
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



  deleteCommentById(id): Observable<any> {

    return this.http.delete(`${REST_API_SERVER}/${id}`);
  }

  deleteComment(): void {
    for (this.currentComment of this.loadedComments) {
    this.deleteCommentById(this.currentComment.id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/home/news']);
        },
        error => {
          console.log(error);
        });
    }
  }






}
