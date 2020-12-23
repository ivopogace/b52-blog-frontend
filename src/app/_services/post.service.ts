import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const REST_API_SERVER = 'http://localhost:8080/api/public/posts';
const REST_API_SERVER2 = 'http://localhost:8080/api/public/category/{id}/posts';


@Injectable({
  providedIn: 'root'
})
export class PostService {


  constructor(private http: HttpClient) {
  }


  getPosts(): Observable<any> {
    return this.http.get(REST_API_SERVER);

  }
}
