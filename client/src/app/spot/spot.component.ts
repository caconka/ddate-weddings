import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpotService } from '../services/spot.service';

@Component({
  selector: 'app-spot',
  templateUrl: './spot.component.html',
  styleUrls: ['./spot.component.css']
})
export class SpotComponent implements OnInit {

  spot: object;

  constructor( private router: Router, private route: ActivatedRoute,
               private spotService: SpotService ) { }

  ngOnInit() {
    this.route.params
    .subscribe( params => {
      this.spotService.spot(params['id'])
      .subscribe(spot => this.spot = spot);
    })
  }

}
