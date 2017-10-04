import { CanActivate } from '@angular/router';
import { Injectable }  from '@angular/core';
import { Observable }  from 'rxjs/Rx';

import { AuthService } from './auth.service';

@Injectable()
export class IsLoggedInService implements CanActivate {
  constructor( private auth: AuthService ) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.getUser() ? true : false;
  }
}