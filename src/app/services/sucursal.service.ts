import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { SERVER } from '../config/server.config';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private webService: WebService, private authService: AuthorizationService) { }
  getAll(page?: any, pageSize?: any) {
    const URL = SERVER.SUCURSALES + `?page=${page}&pageSize=${pageSize}&sort=id&type=asc`;
    // const URL = SERVER.USERS;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.get(URL,headers);
  }
  create(sucursal: any) {
    const URL = SERVER.SUCURSALES;
    const headers = this.webService.imageFileHeaders(this.authService.getToken());
    return this.webService.post(URL, sucursal);
  }
  update(sucursal: any) {
    const URL = SERVER.SUCURSALES;
    const headers = this.webService.imageFileHeaders(this.authService.getToken());
    return this.webService.put(URL, sucursal);
  }

  get(id: any) {
    const URL = SERVER.SUCURSALES + '/' + id;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.get(URL);
  }

  delete(id: any) {
    const URL = SERVER.SUCURSALES + '/' + id;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.delete(URL);
  }
}
