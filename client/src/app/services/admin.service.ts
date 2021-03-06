import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs';
import { environment } from '../../environments/environment';

const BASEURL = environment.BASEURL + '/api';

@Injectable()
export class AdminService {

  private options = { withCredentials: true };

  constructor( private http: Http ) { }

  private handleError(e) {
    return Observable.throw(e.message);
  }

  getProviders() {
    return this.http.get(`${BASEURL}/user/providers`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  createSpot(userId, spotName, dates, photos, lat, lng, guest, menuPrice,
             style, place, places, services, description) {
    return this.http.post(`${BASEURL}/spot/signup`, { userId, spotName, dates, photos, lat, lng, 
                          guest, menuPrice, style, place, places, services, description }, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

}
