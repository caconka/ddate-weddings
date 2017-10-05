import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { SpotComponent } from './spot/spot.component';
import { MessagesComponent } from './messages/messages.component';
import { CommentsComponent } from './spot/comments/comments.component';
import { routes } from './routes';
import { IsLoggedInService } from './services/isLoggedIn.service';
import { AuthService } from './services/auth.service';
import { SpotService } from './services/spot.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    SignupComponent,
    SearchComponent,
    FavoritesComponent,
    ProfileComponent,
    SpotComponent,
    MessagesComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, IsLoggedInService, SpotService],
  bootstrap: [AppComponent]
})
export class AppModule { }
