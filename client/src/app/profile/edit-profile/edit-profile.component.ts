import { Component, OnInit } from '@angular/core';
import { FileUploader } from "ng2-file-upload";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { environment } from '../../../environments/environment';

const BASEURL = environment.BASEURL + "/user";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: any;
  uploader: FileUploader ;
  formInfo: any; 
  feedback: string;

  constructor( private auth: AuthService, private userService: UserService,
               private router: Router ) { }

  ngOnInit() {
    this.user = this.auth.getUser();

    this.auth.getLoginEventEmitter()
    .subscribe(user => { this.user = user });

    this.uploader = new FileUploader({
      url: `${BASEURL}/${this.user._id}/edit`
    });

    this.formInfo = {
      name: this.user.name,
      email: this.user.email,
      phone: this.user.phone,
      avatar: this.user.avatar
    }

    this.uploader.onSuccessItem = (item, response) => {
      this.feedback = JSON.parse(response).message;
    };

    this.uploader.onErrorItem = (item, response, status, headers) => {
      this.feedback = JSON.parse(response).message;
    };
  }

  // this.formInfo = {
  //   name: this.user.name,
  //   email: this.user.email,
  //   phone: this.user.phone,
  //   avatar: this.user.avatar
  // }

  editProfile() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('name', this.formInfo.name);
      form.append('email', this.formInfo.email);
      form.append('phone', this.formInfo.phone);
      form.append('file', this.formInfo.avatar);
    };
    this.uploader.uploadAll();
    this.router.navigate(['profile']);
  }

}
