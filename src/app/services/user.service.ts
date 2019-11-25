import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { SERVER } from '../config/server.config';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private webService: WebService,
    private authService: AuthorizationService
  ) { }
  getlistRoles(page?: any, pageSize?: any, rols?: any, keyword?: any) {
    const URL = SERVER.LISTROLES + `?page=${page}&pageSize=${pageSize}&sort=id&type=asc&rol=${rols}&keyword=${keyword}`;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.getUserRol(URL, headers);
  }
  getAll(page?: any, pageSize?: any) {
    const URL = SERVER.USERS + `?page=${page}&pageSize=${pageSize}&sort=id&type=asc`;
    // const URL = SERVER.USERS;
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

  register(user: any) {
    return this.webService.post(SERVER.REGISTER, user, this.webService.defaultOptions());
  }

  registerSocial(userSocial: any) {
    return this.webService.post(SERVER.URL_BASE + '/register-social', userSocial, this.webService.defaultOptions());
  }

}
