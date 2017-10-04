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
    role: 'User'
  }

  errorControl: boolean = false;

  constructor( public auth: AuthService ) { }

  ngOnInit() {
  }

  signup() {
    const { email, password, name, role } = this.formInfo;
    if(email != '' && password != '' && name != ''){
      this.errorControl = false;
      this.auth.signup(email, password, name, role)
      .subscribe();
      
    } else{
      this.errorControl = true;
    }
  }

}
