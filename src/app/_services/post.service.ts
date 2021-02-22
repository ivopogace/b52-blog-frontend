import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Post} from '../home/post.model';

const REST_API_SERVER = 'http://localhost:8080/api/public/posts';
const REST_API_SERVER2 = 'http://localhost:8080/api/public/category/{id}/posts';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  loadedPosts: Post[];

  constructor(private http: HttpClient) {
  }


  getPosts(): void {
    // @ts-ignore
    this.loadedPosts = this.fetchPosts();

  }

  // tslint:disable-next-line:typedef
    fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(REST_API_SERVER).pipe(map(responseData => {
      const postsArray: Post[] = [];
      for (const key in responseData) {
        if (responseData.hasOwnProperty(key)) {
          postsArray.push({...responseData[key]});
        }
      }
      return postsArray;
    }));
  }


  /** Log a PostService message with the MessageService */
  // tslint:disable-next-line:typedef
  private log(message: string) {
    this.log(`PostService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // tslint:disable-next-line:typedef
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** GET Post by id. Will 404 if id not found */
  getPostByID(id: number): Observable<any> {
    const url = `${REST_API_SERVER}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetched Post id=${id}`)),
      catchError(this.handleError<any>(`getPost id=${id}`))
    );
  }
}
