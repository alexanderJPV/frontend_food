import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    console.log('Este es el component eque se muestra el useer list');
    this.userService.getAll().subscribe(users => {
        console.log(users);
    });
    console
  }
}
