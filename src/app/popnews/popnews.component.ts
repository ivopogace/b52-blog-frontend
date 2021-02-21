import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {TokenStorageService} from '../_services/token-storage.service';
import {Post} from '../home/post.model';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

const REST_API_SERVER = 'http://localhost:8080/api/public/comments';
const REST_API_SERVER1 = 'http://localhost:8080/api/public/posts';
@Component({
  selector: 'app-popnews',
  templateUrl: './popnews.component.html',
  styleUrls: ['./popnews.component.css']
})
export class PopnewsComponent implements OnInit {
  loadedPosts = [];
  loadedComments = [];
  isLoggedIn: boolean;
  currentUser: any;
  currentComment = null;

  constructor(private router: Router, private  http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.fetchPosts();
    this.fetchComments();
    this.currentUser = this.tokenStorageService.getUser();
  }

  // tslint:disable-next-line:typedef
  fetchPosts() {
    this.http.get<{ [key: string]: Post }>(REST_API_SERVER1).pipe(map(responseData => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key]});
        }
      }
      return postsArray; // we return an array of posts
    })).subscribe(posts => {
        console.log(posts);
        // @ts-ignore
        this.loadedPosts = posts;
      }
    );

  }

  // tslint:disable-next-line:typedef
  onCreateComment(postComment: { comment: string }) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    // Send Http request
    if (this.isLoggedIn && postComment.comment.length !== 0) {
      this.http
        .post(
          REST_API_SERVER,
          postComment
        )
        .subscribe(responseData => {
          console.log(responseData);
        });
    }

  }

  private fetchComments(): void {
    this.http.get(REST_API_SERVER).pipe(map(responseData => {
      const commentsArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          commentsArray.push({...responseData[key]});
        }
      }
      return commentsArray;
    })).subscribe(comments => {
        console.log(comments);
        this.loadedComments = comments;
      }
    );
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
