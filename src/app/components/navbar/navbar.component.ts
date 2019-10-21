import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  validateUser: any = false;

  constructor(
    private authService: AuthService,
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
    this.authService.logout();
    this.router.navigate(['/home_web/bodyweb']);
    this.validateUser = false;
  }

  changeaccount() {
    this.authService.logout();
    this.router.navigate(['/user/login']);
    this.validateUser = false;
  }
  dashboard(){
    this.router.navigate(['/admin/dashboard']);
  }
}
