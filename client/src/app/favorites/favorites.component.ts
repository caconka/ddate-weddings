import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  favorites: Array<object>;
  userId;

  constructor( private router: Router, private route: ActivatedRoute,
               private userService: UserService ) { }

  ngOnInit() {
    this.route.params
    .subscribe( params => {
      this.userId = params['id'];
      this.userService.getFavorites(params['id'])
      .subscribe(favorites => { this.favorites = favorites });
    })
  }

  deleteFromFavorites(spotId) {
    this.userService.deleteFromFavorites(this.userId, spotId)
    .subscribe(favorites => { this.favorites = favorites });
  }

}
