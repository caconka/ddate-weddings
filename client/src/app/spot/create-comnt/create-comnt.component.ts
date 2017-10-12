import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotService } from '../../services/spot.service';
import { AuthService } from '../../services/auth.service';

interface CommentForm{
  spotId: string,
  text: string,
  title: string,
  rating: number
}

@Component({
  selector: 'app-create-comnt',
  templateUrl: './create-comnt.component.html',
  styleUrls: ['./create-comnt.component.css']
})
export class CreateComntComponent implements OnInit {

  formInfo: CommentForm = {
    spotId: '',
    title: '',
    text: '',
    rating: 4
  }

  user: object;
  spot: object;

  constructor( private router: Router, private route: ActivatedRoute,
               private spotService: SpotService, private auth: AuthService ) { }

  ngOnInit() {
    this.user = this.auth.getUser();
    this.auth.getLoginEventEmitter()
    .subscribe(user => {  
      this.user = user;
    });

    this.route.params
    .subscribe( params => {
      this.spotService.spot(params['id'])
      .subscribe(spot => {
        this.formInfo.spotId = spot._id;
        this.spot = spot;
      });
    })
  }

  addComment(userId) {
    const { spotId, title, rating, text } = this.formInfo;
    this.spotService.createComment(spotId, userId, title, rating, text)
    .subscribe(() => this.router.navigate(['']));
  }

}
