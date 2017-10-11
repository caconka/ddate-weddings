import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs';
import { environment } from '../../environments/environment';

const BASEURL = environment.BASEURL;

@Injectable()
export class SpotService {

  private options = { withCredentials: true };
  private hide: boolean = false;
  private searchData: Array<object>;

  constructor( private http: Http ) { }

  private handleError(e) {
    return Observable.throw(e.message);
  }

  spot(spotId) {
    return this.http.get(`${BASEURL}/spot/${spotId}/view`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  list() {
    return this.http.get(`${BASEURL}/spot/list`, this.options)
      .map(res => res.json() )
      .catch(this.handleError);
  }

  listMostVisited() {
    return this.http.get(`${BASEURL}/spot/list-visit`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getComments(id) {
    return this.http.get(`${BASEURL}/comment/${id}/list`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  listProvider(id) {
    return this.http.get(`${BASEURL}/spot/${id}/provider`, this.options)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getGeoData(city) {
    return this.http.get('http://maps.google.com/maps/api/geocode/json?address=' + city)
      .map(res => res.json())
      .catch(this.handleError);
  }

  getSpotsByLocation(lat, lng, day, guest, dist) {
    return this.http.post(`${BASEURL}/spot/search`, { lat, lng, day, guest, dist }, this.options)
      .map(res => this.searchData = res.json())
      .catch(this.handleError);
  }

  showHome() {
    this.hide = false;
  }

  hideHome() {
    this.hide = true;
  }
}
