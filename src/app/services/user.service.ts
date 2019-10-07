import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { AuthService } from './auth.service';
import { SERVER } from '../config/server.config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private webService: WebService,
    private authService: AuthService
  ) { }

  getAll() {
    const URL = SERVER.USERS;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.get(URL, headers);
  }

  create(user: any) {
    const URL = SERVER.USERS;
    const headers = this.webService.imageFileHeaders(this.authService.getToken());
    return this.webService.post(URL, user, headers);
  }

  update(user: any) {
    const URL = SERVER.USERS;
    const headers = this.webService.imageFileHeaders(this.authService.getToken());
    return this.webService.put(URL, user, headers);
  }

  get(id: any) {
    const URL = SERVER.USERS + '/' + id;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.get(URL, headers);
  }

  delete(id: any) {
    const URL = SERVER.USERS + '/' + id;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.delete(URL, headers);
  }

  roles() {
    const URL = SERVER.ROLES;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.get(URL, headers);
  }
}
