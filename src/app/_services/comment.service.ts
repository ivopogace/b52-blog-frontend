import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Post} from '../home/post.model';
import {CommentModel} from '../models/comment.model';


const REST_API_SERVER = 'http://localhost:8080/api/public/comments';
const REST_API_SERVER1 = 'http://localhost:8080/api/public/posts';


@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {
  }

  /** POST: add a new comment to the database */
  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(REST_API_SERVER, comment);
  }  /** POST: add a new comment to the database */

  addCommentByPostId(postId: Post, comment: CommentModel): Observable<Comment> {
    return this.http.post<Comment>(`${REST_API_SERVER1}/${postId}/comments`, comment);
  }

  // tslint:disable-next-line:typedef
  deleteCommentById(id) {

    return this.http.delete(`${REST_API_SERVER}/${id}`);
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


  fetchCommentsByPostsID(id): Observable<any[]> {
    return this.http.get(`${REST_API_SERVER1}/${id}/comments`).pipe(map(responseData => {
      const commentsArrayByPostsID = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          commentsArrayByPostsID.push({...responseData[key]});

        }
      }
      console.log(commentsArrayByPostsID);
      return commentsArrayByPostsID;
    }));
  }

}

