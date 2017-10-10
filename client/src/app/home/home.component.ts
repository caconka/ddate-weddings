import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../services/auth.service';
import { SpotService } from '../services/spot.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  user: any;
  spots: Array<object>;
  mostVisited: Array<object>;
  favorites: Array<object>;
  model;
  guest: number;
  hide: boolean = false;
  city: string;

  constructor( private auth: AuthService, private userService: UserService, 
               private spotService: SpotService, config: NgbCarouselConfig) { 
    config.interval = 2000;
    config.wrap = false;
    config.keyboard = false;
  }
              
  ngOnInit() {
    this.user = this.auth.getUser();

    this.auth.getLoginEventEmitter()
    .subscribe(user => {  
      this.user = user 
      if(user && user.role === 'User')
        this.asignFavorites(user._id)
    });

    if(this.user && this.user.role === 'User') 
      this.asignFavorites(this.user._id)
    
    this.spotService.list()
    .subscribe(list => this.spots = list );
    
    this.spotService.listMostVisited()
    .subscribe(list => this.mostVisited = list );
  }

  private asignFavorites(userId) {
    this.userService.getFavorites(userId)
    .subscribe(favorites => { this.favorites = favorites });
  }

  addToFavorites(userId, spotId) {
    this.userService.addFavorit(userId, spotId)
    .subscribe(favorites => { this.favorites = favorites });
  }

  deleteFromFavorites(userId, spotId) {
    this.userService.deleteFromFavorites(userId, spotId)
    .subscribe(favorites => { this.favorites = favorites });
  }

  checkFavorit(spotId) {
    return this.userService.checkFavorit(this.favorites, spotId);
  }

  searchSpots(city) {
    this.spotService.getGeoData(city)
    .subscribe(res => {
      console.log(res.results[0].geometry.location.lat)
      console.log(res.results[0].geometry.location.lng)
    })
  }

  inputToggle(value) {
    console.log(value)
    this.hide = !this.hide;
  }

}
