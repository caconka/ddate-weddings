import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs';
import { environment } from '../../environments/environment';

const BASEURL = environment.BASEURL;

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

  getProviders() {
    return this.http.get(`${BASEURL}/user/providers`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
