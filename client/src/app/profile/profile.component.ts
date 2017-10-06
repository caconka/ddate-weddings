import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: object;

  constructor( private auth: AuthService, private router: Router ) {
    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
      .subscribe( user => this.user = user );
  }

  ngOnInit() {
  }

  logout() {
    this.auth.logout()
    .subscribe(() => { this.router.navigate(['']) });
  }

}
