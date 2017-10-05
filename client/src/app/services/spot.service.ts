import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs';
import { environment } from '../../environments/environment';

const BASEURL = environment.BASEURL + "/spot";

@Injectable()
export class SpotService {

  private spots: Array<object>;
  private mostVisited: Array<object>;
  private options = { withCredentials: true };

  constructor( private http: Http ) { }

  private handleError(e) {
    return Observable.throw(e.json().message);
  }

  list() {
    return this.http.get(`${BASEURL}/list`, this.options)
      .map( res => res.json() )
      .catch( this.handleError );
  }

  listMostVisited() {
    return this.http.get(`${BASEURL}/list-visit`, this.options)
      .map( res => res.json() )
      .catch( this.handleError );
  }
}
