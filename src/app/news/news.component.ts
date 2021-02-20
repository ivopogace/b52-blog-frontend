import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AuthService} from '../_services/auth.service';
import {TokenStorageService} from '../_services/token-storage.service';

const REST_API_SERVER = 'http://localhost:8080/api/public/comments';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  loadedComments = [];
  isLoggedIn: boolean;
  currentUser: any;

  constructor(private  http: HttpClient, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.fetchComments();
    this.currentUser = this.tokenStorageService.getUser();
    console.log(this.currentUser);

  }

  // tslint:disable-next-line:typedef
  onCreateComment(postComment: { comment: string }) {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    // Send Http request
    if (this.isLoggedIn) {
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

  onGetComments(): void {
    this.fetchComments();
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
}
