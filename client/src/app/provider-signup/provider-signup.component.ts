import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-provider-signup',
  templateUrl: './provider-signup.component.html',
  styleUrls: ['./provider-signup.component.css']
})
export class ProviderSignupComponent implements OnInit {
  providers: Array<object>;

  constructor(private auth: AuthService, private userService: UserService) { }

  ngOnInit() {
    this.userService.getProviders()
    .subscribe(providers => { this.providers = providers });
  }

}
