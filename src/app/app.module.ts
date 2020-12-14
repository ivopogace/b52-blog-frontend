import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NewsComponent } from './news/news.component';
import { SportComponent } from './sport/sport.component';
import { PopnewsComponent } from './popnews/popnews.component';
import { KontaktComponent } from './kontakt/kontakt.component';
import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './home/login/login.component';
import { RegisterComponent } from './home/register/register.component';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import {FormsModule} from '@angular/forms';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'news', component: NewsComponent},
  {path: 'sport', component: SportComponent},
  {path: 'popnews', component: PopnewsComponent},
  {path: 'kontakt', component: KontaktComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  ];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NewsComponent,
    SportComponent,
    PopnewsComponent,
    KontaktComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    FormsModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
