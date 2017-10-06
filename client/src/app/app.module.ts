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
import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';
import { ProviderSpotComponent } from './provider-spot/provider-spot.component';
import { EditSpotComponent } from './provider-spot/edit-spot/edit-spot.component';
import { ProviderSignupComponent } from './provider-signup/provider-signup.component';

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
    CommentsComponent,
    ProviderSpotComponent,
    EditSpotComponent,
    ProviderSignupComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthService, IsLoggedInService, SpotService, UserService,
              AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
