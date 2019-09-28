import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { Router } from '@angular/router';
import { SERVER } from '../config/server.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private webService: WebService,
    private router: Router
  ) { }

  login(user: any) {
    return this.webService.post(SERVER.AUTHENTICATE, user, this.webService.defaultOptions());
  }

  getAccount() {
    return this.webService.get(SERVER.ACCOUNT, this.webService.JSONOptions(this.getToken()));
  }

  logout() {
    localStorage.removeItem('food-token');
    sessionStorage.removeItem('food-token');
  }

  getToken() {
    return sessionStorage.getItem('food-token') ? sessionStorage.getItem('food-token') : (localStorage.getItem('food-token') ? localStorage.getItem('food-token') : '');
  }

  // getTokenExpirationDate(token: string): Date {
  //   const decoded = jwt_decode(token);
  //   if (decoded['exp'] === undefined) {
  //     return null;
  //   }
  //   const date = new Date(0);
  //   date.setUTCSeconds(decoded['exp']);
  //   return date;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if (!token) {
  //     token = this.getToken();
  //   }
  //   if (!token) {
  //     return true;
  //   }
  //   const date = this.getTokenExpirationDate(token);
  //   if (date === undefined) {
  //     return false;
  //   }
  //   const expired = !(date.valueOf() > new Date().valueOf());
  //   if (expired) {
  //     this.logout();
  //   }
  //   return expired;
  // }

  // isLogged() {
  //   return this.webService.get(SERVER.AUTHENTICATE, this.webService.textOptions(this.getToken())).pipe(map(res => {
  //     const logged = res && !this.isTokenExpired();
  //     if (logged) {
  //       return true;
  //     } else {
  //       this.router.navigate(['/dashboard']);
  //       return false;
  //     }
  //   }));
  // }

}
