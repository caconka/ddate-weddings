import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-provider-signup',
  templateUrl: './provider-signup.component.html',
  styleUrls: ['./provider-signup.component.css']
})
export class ProviderSignupComponent implements OnInit {

  hide: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  showSignup() {
    this.hide = !this.hide;
  }

}
