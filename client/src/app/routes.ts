import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { SearchComponent } from './search/search.component';
import { MessagesComponent } from './messages/messages.component';
import { SpotComponent } from './spot/spot.component';
import { CommentsComponent } from './spot/comments/comments.component';
import { CalendarComponent } from './spot/calendar/calendar.component';

import { IsLoggedInService } from './services/isLoggedIn.service';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'search', component: SearchComponent },
    { path: ':id/view', component: SpotComponent },
    { path: ':id/comments', component: CommentsComponent },
    { path: ':id/calendar', component: CalendarComponent },
    { path: 'profile', component: ProfileComponent,
    canActivate: [IsLoggedInService] },
    { path: 'profile/edit', component: EditProfileComponent,
    canActivate: [IsLoggedInService] },
    { path: ':id/favorites', component: FavoritesComponent,
    canActivate: [IsLoggedInService] },
    { path: 'messages', component: MessagesComponent,
    canActivate: [IsLoggedInService] },
    { path: '**', redirectTo: '' }
];