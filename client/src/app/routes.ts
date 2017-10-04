import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { IsLoggedInService } from './services/isLoggedIn.service';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },

    // { path: 'user',  component: UserprofileComponent,canActivate: [ IsLoggedInService ]  },
    // { path: 'login',  component: LoginformComponent,  },
    // { path: 'signup',  component: SignupformComponent,  },
    // { path: '**', redirectTo: '' }
];