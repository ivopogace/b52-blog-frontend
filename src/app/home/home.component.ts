import {Component, OnInit} from '@angular/core';
import {PostService} from '../_services/post.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts$;

  constructor(private postService: PostService) {
  }


  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();
  }


}
