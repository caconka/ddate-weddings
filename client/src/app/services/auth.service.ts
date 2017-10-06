import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import 'rxjs';
import { environment } from '../../environments/environment';

const BASEURL = environment.BASEURL + "/auth";

@Injectable()
export class AuthService {

  private hide: boolean = true;
  private user: object;
  private userLoginEvent: EventEmitter<any> = new EventEmitter<any>();
  private options = { withCredentials: true };

  constructor(private http: Http) {
    this.isLoggedIn().subscribe();
  }

    public getLoginEventEmitter(): EventEmitter<any>{
      return this.userLoginEvent;
    }

    public getUser(){
      return this.user;
    }

    private emitUserLoginEvent(user){
      this.user = user;
      this.userLoginEvent.emit(user);
      return user;
    }

    private handleError(e) {
      return Observable.throw(e.message);
    }

    signup(email, password, name, role) {
      return this.http.post(`${BASEURL}/signup`, { email, password, name, role }, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(user))
        .catch(this.handleError);
    }

    signupProvider(email, password, name, role) {
      return this.http.post(`${BASEURL}/provider-signup`, { email, password, name, role }, this.options)
        .map(res => res.json())
        .catch(this.handleError);
    }

    login(email, password) {
      return this.http.post(`${BASEURL}/login`, { email, password }, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(user))
        .catch(this.handleError);
    }

    logout() {
      return this.http.get(`${BASEURL}/logout`, this.options)
        .map(res => {
          this.emitUserLoginEvent(null);
          return res.json();
        })
        .catch(this.handleError);
    }

    isLoggedIn() {
      return this.http.get(`${BASEURL}/loggedin`, this.options)
        .map(res => res.json())
        .map(user => this.emitUserLoginEvent(user))
        .catch(this.handleError);
    }

    showHide() {
      this.hide = !this.hide;
      return this.hide;
    }
}