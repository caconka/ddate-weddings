import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-provider-signup',
  templateUrl: './provider-signup.component.html',
  styleUrls: ['./provider-signup.component.css']
})
export class ProviderSignupComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
