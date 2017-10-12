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
import { CalendarComponent } from './spot/calendar/calendar.component';
import { ProviderSpotComponent } from './provider-spot/provider-spot.component';
import { EditSpotComponent } from './provider-spot/edit-spot/edit-spot.component';
import { ProviderSignupComponent } from './provider-signup/provider-signup.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';

import { routes } from './routes';

import { IsLoggedInService } from './services/isLoggedIn.service';
import { AuthService } from './services/auth.service';
import { SpotService } from './services/spot.service';
import { UserService } from './services/user.service';
import { AdminService } from './services/admin.service';

import { FileSelectDirective } from "ng2-file-upload";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { CreateComntComponent } from './spot/create-comnt/create-comnt.component';

@NgModule({
  declarations: [
    AppComponent, HomeComponent, NavComponent, LoginComponent, SignupComponent,
    SearchComponent, FavoritesComponent, ProfileComponent, SpotComponent,
    MessagesComponent, CommentsComponent, ProviderSpotComponent, EditSpotComponent,
    ProviderSignupComponent, FileSelectDirective, EditProfileComponent, CalendarComponent, CreateComntComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, RouterModule.forRoot(routes),
    NgbModule.forRoot(), 
    AgmCoreModule.forRoot({ apiKey: 'AIzaSyDnT-UNmO3HtkLjtJllS1XgwF44XniS8qA' })
  ],
  providers: [AuthService, IsLoggedInService, SpotService, UserService,
              AdminService],
  bootstrap: [AppComponent]
})
export class AppModule { }
