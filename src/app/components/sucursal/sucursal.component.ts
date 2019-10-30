import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Router } from '@angular/router';
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
  // searchByKeyword() {
  //   console.log('-------------1 pase pasdsldklskdor aqui ', this.keyword);
  //   this.sucursalService.getlistRoles(this.currentPage - 1, this.pageSize, this.role, this.keyword).subscribe(usersrol => {
  //     this.totalItems = usersrol.elements;
  //     this.users = usersrol.usuario.rows;
  //   });
  // }
}
