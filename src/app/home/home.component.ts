import {Component, OnInit} from '@angular/core';
import {PostService} from '../_services/post.service';
import {Observable} from 'rxjs';
import {TokenStorageService} from '../_services/token-storage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: [] = null;
  currentUser: any;
  constructor(private postService: PostService, private token: TokenStorageService) {
  }


  ngOnInit(): any {
    this.currentUser = this.token.getUser();
    this.posts = this.postService.getPosts();
  }

  showNewsDetail(): void {

  }
}
