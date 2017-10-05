import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs';
import { environment } from '../../environments/environment';

const BASEURL = environment.BASEURL;

@Injectable()
export class SpotService {

  private options = { withCredentials: true };

  constructor( private http: Http ) { }

  private handleError(e) {
    return Observable.throw(e.json().message);
  }

  list() {
    return this.http.get(`${BASEURL}/spot/list`, this.options)
      .map( res => res.json() )
      .catch( this.handleError );
  }

  listMostVisited() {
    return this.http.get(`${BASEURL}/spot/list-visit`, this.options)
      .map( res => res.json() )
      .catch( this.handleError );
  }

  getComments(id) {
    return this.http.get(`${BASEURL}/comment/${id}/list`, this.options)
      .map( res => res.json() )
      .catch( this.handleError );
  }

  listProvider(id) {
    return this.http.get(`${BASEURL}/spot/${id}/provider`, this.options)
      .map( res => res.json() )
      .catch( this.handleError );
  }
}
