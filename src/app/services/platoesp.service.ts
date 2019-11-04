import { Injectable } from '@angular/core';
import { WebService } from './web.service';
import { SERVER } from '../config/server.config';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root'
})
export class PlatoespService {

  constructor(private webService: WebService, private authService: AuthorizationService) { }
  getAll(page?: any, pageSize?: any) {
    const URL = SERVER.PLATOS + `?page=${page}&pageSize=${pageSize}&sort=id&type=asc`;
    const headers = this.webService.JSONOptions(this.authService.getToken());
    return this.webService.get(URL);
  }
}
