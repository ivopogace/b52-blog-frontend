import {Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TokenStorageService} from './token-storage.service';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {authInterceptorProviders} from '../_helpers/auth.interceptor';
import {EventEmitter} from 'events';

const REST_API_SERVER = 'http://localhost:8080/api/public/posts';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  // tslint:disable-next-line:ban-types
  posts: Object = [];


  constructor(private http: HttpClient) {
  }


  public getPosts(): any {
    this.http.get(REST_API_SERVER)
      .subscribe(res => {
        this.posts = res;
        console.log(this.posts);
      });
    return this.posts;


  }

//   // tslint:disable-next-line:typedef
//   getPostUpdateListener() {
//     return this.postsUpdated.asObservable();
//   }
//
//   // tslint:disable-next-line:typedef
//   addPost(title: string, content: string) {
//     this.http
//       .post<{ message: string, postId: string }>(REST_API_SERVER)
//       .subscribe(responseData => {
//         const id = responseData.postId;
//         post.id = id;
//         this.posts.push(post);
//         this.postsUpdated.next([...this.posts]);
//       });
//   }
//
//   // tslint:disable-next-line:typedef
//   deletePost(postId: string) {
//     this.http.delete(REST_API_SERVER + postId)
//       .subscribe(() => {
//         const updatedPosts = this.posts.filter(post => post.id !== postId);
//         this.posts = updatedPosts;
//         this.postsUpdated.next([...this.posts]);
//       });
//   }
// }
}
