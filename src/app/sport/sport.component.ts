import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../_services/token-storage.service';
import {Post} from '../home/post.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PostService} from '../_services/post.service';
import {CommentService} from '../_services/comment.service';

const REST_API_SERVER = 'http://localhost:8080/api/public/comments';
const REST_API_SERVER1 = 'http://localhost:8080/api/public/posts';
@Component({
  selector: 'app-sport',
  templateUrl: './sport.component.html',
  styleUrls: ['./sport.component.css']
})
export class SportComponent implements OnInit {
  loadedPosts = [];
  loadedComments = [];
  isLoggedIn: boolean;
  currentUser: any;
  currentComment = null;

  // tslint:disable-next-line:max-line-length
  constructor(private router: Router, private  http: HttpClient, private tokenStorageService: TokenStorageService, private postService: PostService, private commentService: CommentService) {
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


  delete(id): Observable<any> {

    return this.http.delete(`${REST_API_SERVER}/${id}`);
  }

  deleteComment(): void {
    for (this.currentComment of this.loadedComments) {
      this.delete(this.currentComment.id)
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
