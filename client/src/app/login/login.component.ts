import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

interface LoginForm{
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formInfo:LoginForm = {
    email: "",
    password: ""
  };

  constructor( public auth: AuthService ) { }

  ngOnInit() {
  }

  login(){
    const { email, password } = this.formInfo;
    if(email != "" && password != ""){
      console.log(`Login with ${email} ${password}`)
      this.auth.login(email, password)
      .map(user => console.log(user))
      .subscribe();
      
    } else{
      console.log("You must set a username and a password");
    }
  }

}
