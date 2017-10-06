import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

interface SignupForm{
  email: string,
  password: string,
  name: string,
  role: string
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  formInfo: SignupForm = {
    email: '',
    password: '',
    name: '',
    role: ''
  }
  user: object;

  constructor( private auth: AuthService ) { }

  ngOnInit() {
    this.user = this.auth.getUser();

    this.auth.getLoginEventEmitter()
    .subscribe(user => { this.user = user });
  }

  signup() {
    const { email, password, name } = this.formInfo;
    this.auth.signup(email, password, name, 'User')
    .subscribe();
  }

  signupProvider() {
    const { email, password, name } = this.formInfo;
    this.auth.signupProvider(email, password, name, 'Provider')
    .subscribe(user => console.log(user));
  }

}
