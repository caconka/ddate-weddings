import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpotService } from '../services/spot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: object;
  spots: Array<object>;
  mostVisited: Array<object>;

  constructor( private auth: AuthService, 
               private spot: SpotService ) {

    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
      .subscribe( user => this.user = user );
  }

  ngOnInit() {
    this.spot.list()
    .subscribe( list => this.spots = list );

    this.spot.listMostVisited()
    .subscribe( list => this.mostVisited = list );
  }

}
