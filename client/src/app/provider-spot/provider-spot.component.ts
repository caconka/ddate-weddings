import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpotService } from '../services/spot.service';

@Component({
  selector: 'app-provider-spot',
  templateUrl: './provider-spot.component.html',
  styleUrls: ['./provider-spot.component.css']
})
export class ProviderSpotComponent implements OnInit {
  user: any;
  spots: Array<object>;

  constructor( private auth: AuthService, private spotService: SpotService ) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
    .subscribe( user => { 
      this.user = user 
    });

    // this.spotService.listProvider(this.user._id) {

    // }
  }

}
