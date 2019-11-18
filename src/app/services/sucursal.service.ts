import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { SERVER } from '../config/server.config';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(private webService: WebService, private authService: AuthorizationService) { }
  getlisTipos(page?: any, pageSize?: any, tipo?: any, keyword?: any){
    const URL = SERVER.LISTTIPOS + `?page=${page}&pageSize=${pageSize}&sort=id&type=asc&tipo=${tipo}&keyword=${keyword}`;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.getSucursalTipo(URL);
  }
  getAll(page?: any, pageSize?: any) {
    const URL = SERVER.SUCURSALES + `?page=${page}&pageSize=${pageSize}&sort=id&type=asc`;
    // const URL = SERVER.USERS;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.get(URL,headers);
  }
  create(sucursal: any) {
    const URL = SERVER.SUCURSALES;
    const headers = this.webService.imageFileHeaders(this.authService.getToken());
    return this.webService.post(URL, sucursal, headers);
  }
  update(sucursal: any) {
    const URL = SERVER.SUCURSALES;
    const headers = this.webService.imageFileHeaders(this.authService.getToken());
    return this.webService.put(URL, sucursal, headers);
  }

  get(id: any) {
    const URL = SERVER.SUCURSALES + '/' + id;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.get(URL,headers);
  }

  delete(id: any) {
    const URL = SERVER.SUCURSALES + '/' + id;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.delete(URL,headers);
  }
  tipos(){
    const URL = SERVER.TIPOS;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.get(URL, headers);
  }
}
