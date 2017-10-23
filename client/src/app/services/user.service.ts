import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs';
import { environment } from '../../environments/environment';

const BASEURL = environment.BASEURL + '/api';

@Injectable()
export class UserService {

  private options = { withCredentials: true };

  constructor( private http: Http ) { }

  private handleError(e) {
    return Observable.throw(e.message);
  }

  getFavorites(id) {
    return this.http.get(`${BASEURL}/wedding/${id}/list`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  addFavorit(userId, spotId) {
    return this.http.post(`${BASEURL}/wedding/${userId}/add`, { spotId }, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  deleteFromFavorites(userId, spotId) {
    return this.http.post(`${BASEURL}/wedding/${userId}/delete`, { spotId }, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  checkFavorit(favorites, spotId) {
    let control = false;
    favorites.forEach( favorit => {
      if(favorit._id == spotId)
        control = true;
    })
    return control;
  }

  getDiary(id) {
    return this.http.get(`${BASEURL}/diary/${id}/events`)
      .map(res => res.json())
      .catch(this.handleError);
  }

  addEvent(userId, title, content, date, spotId) {
    return this.http.post(`${BASEURL}/diary/${userId}/add-event`, 
                          { title, content, date, spotId }, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  createChat(userId, spotId) {
    return this.http.get(`${BASEURL}/chat/${userId}/${spotId}/create-chat`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getChats(userId) {
    return this.http.get(`${BASEURL}/chat/${userId}/chats`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getMessagesChat(chatId) {
    return this.http.get(`${BASEURL}/chat/${chatId}/messages`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
