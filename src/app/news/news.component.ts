import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

const REST_API_SERVER = 'http://localhost:8080/api/public/comments';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  loadedComments = [];

  constructor(private  http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchComments();
  }

  // tslint:disable-next-line:typedef
  onCreateComment(postComment: { comment: string }) {
    // Send Http request
    this.http
      .post(
        REST_API_SERVER,
        postComment
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
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
