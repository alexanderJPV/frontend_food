import { Component } from '@angular/core';
import { Router, ActivatedRouteSnapshot, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend-restaurante';
  constructor(private router: Router){}
  public hideNavbarOutlet() {
    return ((this.router.url !== '/user/login') &&
            (this.router.url !== '/user/register') &&
            (this.router.url.includes('/admin') !== true) &&
            (this.router.url.includes('/forgot-password') !== true)
            );
  }
}

