import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../_services/token-storage.service';
import {PostService} from '../_services/post.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  id = '';
  currentUser: any;
  loadedPostsByName = [];
  loadedPostToEdit = '';
  postSelected = false;
  postForm: FormGroup;
  image = '';
  tittle = '';
  body = '';

  // tslint:disable-next-line:max-line-length
  constructor( private fb: FormBuilder, private postService: PostService, private token: TokenStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();
    this.postService.fetchPosts().subscribe(posts => this.loadedPostsByName = posts);
    console.log(this.loadedPostsByName);

    this.postForm = this.fb.group({
      id: ['', Validators.required],
      tittle: ['', Validators.required],
      body: ['', Validators.required],
      image: [''],
    });
  }


  // tslint:disable-next-line:typedef
  onSubmit(id) {
   const post = {
      id: this.postForm.value.id,
      tittle: this.postForm.value.tittle,
      status: 'PUBLISHED',
      body: this.postForm.value.body,
      image: this.postForm.value.image,

    };
    // Send Http request
   this.postService.update(id, post)
      .subscribe(updatedPost => {
        console.log(updatedPost);
      });
  }


  // tslint:disable-next-line:typedef
  onEdit(id: string) {
    this.postSelected = true;

    if (this.postSelected === true) {
    this.postService.getPostByID((id as unknown as number)).subscribe(post => {
      this.loadedPostToEdit = post;
    } );
    }
    console.log('change clicked');
  }
}
