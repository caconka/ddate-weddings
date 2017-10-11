import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpotService } from '../services/spot.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  user: any;
  favorites: Array<object>;
  searchData: Array<object>;
  


  constructor( private auth: AuthService, private userService: UserService, 
               private spotService: SpotService) { }

  ngOnInit() {
    this.user = this.auth.getUser();

    this.auth.getLoginEventEmitter()
    .subscribe(user => {  
      this.user = user;
      if(user && user.role === 'User')
        this.asignFavorites(user._id)
    });

    if(this.user && this.user.role === 'User') 
      this.asignFavorites(this.user._id)
    
    this.searchData = this.spotService.getSearchData();
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

}
