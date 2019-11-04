import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserCreateComponent } from '../formsparts/user-create/user-create.component';
declare var $: any;
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: any[];
  receivedChildMessage: any;

  // valores por defecto;
  pageSize = 10;
  totalItems = 0;
  currentPage = 1;
  rotate = true;
  maxSize = 10;
  keyword: any = '';
  role: any = '';

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getListUser();
  }
  configpagination(nropages: any) {
    this.pageSize = nropages;
    if (this.keyword || this.role) {
      this.searchByKeyword();
    } else {
      this.getListUser();
    }
  }
  getListUser(rols?: any) {
    this.keyword = '';
    this.role = '';
    this.userService.getAll(this.currentPage - 1, this.pageSize).subscribe(users => {
      this.totalItems = users.elements;
      this.users = users.usuario.rows;
    });
  }
  onDeleteUser(id: number): void {
    if (confirm('Esta seguro que quiere eliminar?')) {
      //   this.dataApiService.deleteBook(id).subscribe();
      this.userService.delete(id).subscribe(user => {
        this.getListUser();
      });
    }
  }

  changePage(event: any): void {
    this.currentPage = event.page;
    if (this.keyword || this.role) {
      this.searchByKeyword();
    } else {
      this.getListUser();
    }
  }

  searchByKeyword() {
    console.log('-------------1 pase pasdsldklskdor aqui ', this.keyword);
    this.userService.getlistRoles(this.currentPage - 1, this.pageSize, this.role, this.keyword).subscribe(usersrol => {
      this.totalItems = usersrol.elements;
      this.users = usersrol.usuario.rows;
    });
  }

  searchByRoles(rol?: any) {
    this.role = rol
    this.userService.getlistRoles(this.currentPage - 1, this.pageSize, this.role, this.keyword).subscribe(usersrol => {
      this.totalItems = usersrol.elements;
      this.users = usersrol.usuario.rows;
    });
  }

}
