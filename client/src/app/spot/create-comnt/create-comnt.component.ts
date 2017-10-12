import { Component, OnInit } from '@angular/core';

interface CommentForm{
  userId: string,
  spotId: string,
  content: string,
  rating: number
}

@Component({
  selector: 'app-create-comnt',
  templateUrl: './create-comnt.component.html',
  styleUrls: ['./create-comnt.component.css']
})
export class CreateComntComponent implements OnInit {

  formInfo: CommentForm = {
    userId: '',
    spotId: '',
    content: '',
    rating: undefined
  }

  constructor() { }

  ngOnInit() {
  }

}
