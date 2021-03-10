import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthInterceptor} from '../_helpers/auth.interceptor';

const AUTH_API = 'http://localhost:8080/api/auth/';
const FORGOT_PASSWORD = 'http://localhost:8080/api/auth/forgot_password';
const RESET_PASSWORD = 'http://localhost:8080/api/auth/reset_password?token=';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // // tslint:disable-next-line:typedef
  // resetPassword(token: string, password: string, confirmPassword: string) {
  //   return this.http.post(`${RESET_PASSWORD}`, { token, password, confirmPassword });
  // }


  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password
    }, httpOptions);
  }


  // tslint:disable-next-line:typedef
  forgotPassword(email) {
    return this.http.post(`${FORGOT_PASSWORD}`,  email );
  }

  // tslint:disable-next-line:typedef
  resetPassword(params) {
    return this.http.post(`${RESET_PASSWORD}` , params);
  }

  // tslint:disable-next-line:typedef
  validateResetToken(token: string) {
    return this.http.post(`api/auth/reset-password?token=`, { token });
  }
}
