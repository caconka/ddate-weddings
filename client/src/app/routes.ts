import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { SearchComponent } from './search/search.component';
import { MessagesComponent } from './messages/messages.component';
import { DiaryComponent } from './diary/diary.component';
import { SpotComponent } from './spot/spot.component';
import { CommentsComponent } from './spot/comments/comments.component';
import { CalendarComponent } from './spot/calendar/calendar.component';
import { CreateComntComponent } from './spot/create-comnt/create-comnt.component';

import { IsLoggedInService } from './services/isLoggedIn.service';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'search', component: SearchComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [IsLoggedInService] },
    { path: 'profile/edit', component: EditProfileComponent,
      canActivate: [IsLoggedInService] },
    { path: ':id/messages', component: MessagesComponent,
      canActivate: [IsLoggedInService] },
    { path: ':id/diary', component: DiaryComponent, canActivate: [IsLoggedInService] },
    { path: ':id/view', component: SpotComponent },
    { path: ':id/comments', component: CommentsComponent },
    { path: ':id/comment/create', component: CreateComntComponent,
      canActivate: [IsLoggedInService]},
    { path: ':id/calendar', component: CalendarComponent },
    { path: ':id/favorites', component: FavoritesComponent,
      canActivate: [IsLoggedInService] },
    { path: '**', redirectTo: '' }
];