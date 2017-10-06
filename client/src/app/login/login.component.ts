import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

interface LoginForm{
  email: string,
  password: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formInfo: LoginForm = {
    email: '',
    password: ''
  };

  constructor( private auth: AuthService, private router: Router ) { }

  ngOnInit() {
  }

  login() {
    const { email, password } = this.formInfo;
    this.auth.login(email, password)
    .subscribe(() => this.router.navigate(['']));
  }

}
