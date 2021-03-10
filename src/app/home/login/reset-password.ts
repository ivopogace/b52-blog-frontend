import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



import {AuthService} from '../../_services/auth.service';
import {AlertService} from '../../_services/alert.service';
import {HttpParams} from '@angular/common/http';


@Component({ templateUrl: 'reset-password.component.html' })
export class ResetPasswordComponent implements OnInit {

  token = null;
  form: FormGroup;
  passwordReseted = false;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      token: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    this.token = this.route.snapshot.queryParams.token;
    console.log(this.route.snapshot.queryParams.token);

    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

  }

  // // convenience getter for easy access to form fields
  // // tslint:disable-next-line:typedef
  // get f() { return this.form.controls; }

  // tslint:disable-next-line:typedef
  onSubmit() {
    const params = new HttpParams()
      .set('token' , this.form.value.token)
      .set('password' , this.form.value.password)
      .set('confirmPassword' , this.form.value.confirmPassword);

    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.passwordReseted = true;
    this.authService.resetPassword(params)
      .subscribe(res => console.log(res));
  }
}
