import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

const REST_API_SERVER = 'http://localhost:8080/api/public/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // tslint:disable-next-line:ban-types
  categories: Object = [];


  constructor(private http: HttpClient) {
  }


  public getAllCategories(): any {
    this.http.get(REST_API_SERVER)
      .subscribe(res => {
        this.categories = res;
      });
    return this.categories;
  }
}
