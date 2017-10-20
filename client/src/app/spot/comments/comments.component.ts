import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotService } from '../../services/spot.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  user: object;
  spot: object;
  comments: Array<object>;
  control: Array<number> = [1, 2, 3, 4, 5];

  constructor( private router: Router, private route: ActivatedRoute,
               private spotService: SpotService, private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
    .subscribe(user => {  
      this.user = user;
    });

    this.route.params
    .subscribe( params => {
      this.spotService.getComments(params['id'])
      .subscribe(comments => this.comments = comments);
      
      this.spotService.spot(params['id'])
      .subscribe(spot => this.spot = spot);
    })
  }

}
