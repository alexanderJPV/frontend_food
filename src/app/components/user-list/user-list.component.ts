import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
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

  // page = 1;
  pageSize = 10;
  totalItems = 0;
  currentPage = 1;
  rotate = true;
  maxSize = 10;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getListUser();
  }
  getListUser() {
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

  showNotification(from, align) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    //1 => color azul
    //2 => color verde
    //3 => color anaranjado
    //4 => color rojo
    const color = 2;

    $.notify({
      icon: "notifications",
      message: "Usuario añadido exitosamente!!!"

    }, {
      type: type[color],
      timer: 4000,
      placement: {
        from: from,
        align: align
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">notifications</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

  changePage(event: any): void {
    this.currentPage = event.page;
    this.getListUser();
  }
}
