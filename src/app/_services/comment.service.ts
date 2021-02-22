import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';


const REST_API_SERVER = 'http://localhost:8080/api/public/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  /** POST: add a new comment to the database */
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(REST_API_SERVER, comment);
  }

  fetchComments(): Observable<any[]> {
    return this.http.get(REST_API_SERVER).pipe(map(responseData => {
      const commentsArray = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          commentsArray.push({...responseData[key]});
        }
      }
      return commentsArray;
    }));
  }

}

