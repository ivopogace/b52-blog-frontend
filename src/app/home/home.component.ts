import {Component, OnInit} from '@angular/core';
import {PostService} from '../_services/post.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Post} from './post.model';

const REST_API_SERVER = 'http://localhost:8080/api/public/posts';
const REST_API_POSTSBYCATEGORYID = 'http://localhost:8080/api/public/category/:id/posts';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient, private postService: PostService, private  router: Router) {
  }


  ngOnInit(): void {
    this.postService.fetchPosts().subscribe(posts => this.loadedPosts = posts);
  }


  getPostNewsDetails(): void {
    this.router.navigateByUrl('home/news');
  }

  getPostPopNewsDetails(): void {
    this.router.navigateByUrl('home/popnews');
  }

  getPostSportDetails(): void {
    this.router.navigateByUrl('home/sport');
  }
}
