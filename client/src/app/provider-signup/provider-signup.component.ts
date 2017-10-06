import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AdminService } from '../services/admin.service';

interface ProviderForm{
  userId: string,
  spotName: string,
  dates: Array<Date>
}

@Component({
  selector: 'app-provider-signup',
  templateUrl: './provider-signup.component.html',
  styleUrls: ['./provider-signup.component.css']
})
export class ProviderSignupComponent implements OnInit {
  providers: Array<object>;
  formInfo: ProviderForm = {
    userId: '',
    spotName: '',
    dates: []
  }

  constructor(private auth: AuthService, private adminService: AdminService) { }

  ngOnInit() {
    this.adminService.getProviders()
    .subscribe(providers => { this.providers = providers });
  }

  createSpot() {
    const { userId, spotName } = this.formInfo;
    this.adminService.createSpot(userId, spotName)
    .subscribe();
  }

  addDate(elem) {
    this.formInfo.dates.push(elem);
    this.formInfo.dates.sort();
  }
}
