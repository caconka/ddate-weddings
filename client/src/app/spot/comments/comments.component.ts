import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotService } from '../../services/spot.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  comments: Array<object>;

  constructor( private router: Router, private route: ActivatedRoute,
               private spotService: SpotService ) { }

  ngOnInit() {
    this.route.params
    .subscribe( params => {
      this.spotService.getComments(params['id'])
      .subscribe(comments => this.comments = comments);
    })
  }

}
