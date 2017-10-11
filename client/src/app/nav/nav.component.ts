import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { SpotService } from '../services/spot.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  user: object;
  anchorActive: boolean = true;

  constructor( private auth: AuthService, private spotService: SpotService ) {
    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
    .subscribe( user => this.user = user );
  }

  ngOnInit() {
  }

  anchor(a, showHome = false) {
    if(showHome == true)
      this.spotService.showHome();

    const childrens = a.parentNode.parentNode.children;
    for(let i=0; i<childrens.length; i++) {
      childrens[i].classList.remove('pink');
    }
    a.parentNode.className = 'pink';
  }

  specialAnchor(a) {
    this.auth.setHide();
    this.anchor(a);
  }

}
