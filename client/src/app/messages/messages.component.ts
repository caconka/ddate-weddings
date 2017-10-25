import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  user: object;
  chats: Array<object>;
  messages: Array<object>;
  modalMess: boolean = false;

  constructor( private auth: AuthService, private userService: UserService, 
               private route: ActivatedRoute, ) { }

  ngOnInit() {
    this.user = this.auth.getUser();

    this.auth.getLoginEventEmitter()
    .subscribe(user => {  
      if(user !== undefined)
        this.user = user 
    });

    this.route.params
    .subscribe(params => {
      this.userService.getChats(params['id'])
      .subscribe(chats => this.chats = chats);
    })
  }

  openChat(chatId) {
    this.userService.getMessagesChat(chatId)
    .subscribe(messages => this.messages = messages);
    this.modalMess = true;
  }

  closeChat() {
    this.messages = [];
    this.modalMess = false;
  }

  createMessage(chatId, author, content) {
    this.userService.createMessage(chatId, author, content)
    .subscribe()
  }

}
