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
  public users: any[];
  receivedChildMessage: any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getListUser();
  }
  getListUser(){
    this.userService.getAll().subscribe(users => {
      this.users=users.usuario.rows;
    });
  }
  onDeleteUser(id: number): void {
     if (confirm('Esta seguro que quiere eliminar?')) {
    //   this.dataApiService.deleteBook(id).subscribe();
         this.userService.delete(id).subscribe( user =>{
           this.getListUser();
         });
     }
  }
  getMessage(message: any) {
        this.receivedChildMessage = message;
       console.log('----------------------------->>>>>>>>>>>>>>>> ', this.receivedChildMessage);
        if (this.receivedChildMessage) {
          this.getListUser();
        }
  }
}
