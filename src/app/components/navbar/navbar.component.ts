import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  validateUser: any = false;

  constructor(
    private authService: AuthorizationService,
    private router: Router
  ) {
    this.showDropDown();
  }

  ngOnInit() {
    this.showDropDown();
  }

  showDropDown() {
    if (!this.authService.getToken()) {
      this.validateUser = true;
    } else {
      this.validateUser = false;
    }
  }

  logout() {
    this.validateUser = false;
    this.authService.logout();
    // this.router.navigate(['/home_web/bodyweb']);
    this.router.navigate(['/user/login']);
  }

  changeaccount() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
    this.validateUser = false;
  }
  dashboard() {
    this.router.navigate(['/admin/dashboard']);
  }
}
