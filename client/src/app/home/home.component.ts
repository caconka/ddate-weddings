import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpotService } from '../services/spot.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: object;
  spots: Array<object>;
  mostVisited: Array<object>;

  constructor( private auth: AuthService, private userService: UserService, 
               private spotService: SpotService ) {

    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
      .subscribe( user => this.user = user );
  }

  ngOnInit() {
    this.spotService.list()
    .subscribe( list => this.spots = list );

    this.spotService.listMostVisited()
    .subscribe( list => this.mostVisited = list );
  }

  addToFavorites(userId, spotId) {
    this.userService.addFavorit(userId, spotId)
    .subscribe( favorit => console.log(favorit) );
  }
}
