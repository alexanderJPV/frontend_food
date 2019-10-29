import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-sucursal',
  templateUrl: './sucursal.component.html',
  styleUrls: ['./sucursal.component.css']
})
export class SucursalComponent implements OnInit {
  public sucursales: any[];
  // valores por defecto;
  pageSize = 10;
  totalItems = 0;
  currentPage = 1;
  rotate = true;
  maxSize = 10;
  keyword: any = '';
  tipo: any = '';
  constructor(private router: Router, private sucursalService: SucursalService) { }

  ngOnInit() {
    this.getLisSucursal();
  }
  configpagination(nropages: any) {
    this.pageSize = nropages;
    if (this.keyword || this.tipo) {
      // this.searchByKeyword();
    } else {
      this.getLisSucursal();
    }
  }
  getLisSucursal(tipos?: any) {
    this.keyword = '';
    this.tipo = '';
    this.sucursalService.getAll(this.currentPage - 1, this.pageSize).subscribe(sucursales => {
      this.totalItems = sucursales.elements;
      this.sucursales = sucursales.sucursal.rows;
      console.log(this.sucursales);
    });
  }
  onDeleteUser(id: number): void {
    if (confirm('Esta seguro que quiere eliminar?')) {
      this.sucursalService.delete(id).subscribe(user => {
        this.getLisSucursal();
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
  // searchByKeyword() {
  //   console.log('-------------1 pase pasdsldklskdor aqui ', this.keyword);
  //   this.sucursalService.getlistRoles(this.currentPage - 1, this.pageSize, this.role, this.keyword).subscribe(usersrol => {
  //     this.totalItems = usersrol.elements;
  //     this.users = usersrol.usuario.rows;
  //   });
  // }
}
