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
  tipo: any = '';
  keyword: any = '';
  constructor(private router: Router, private sucursalService: SucursalService) { }

  ngOnInit() {
    this.getLisSucursal();
  }
  configpagination(nropages: any) {
    this.pageSize = nropages;
    if (this.keyword || this.tipo) {
      this.searchByKeyword();
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
      // console.log(this.sucursales);
      // console.log(this.sucursales[0].dias);
      // console.log(this.sucursales[0].hora_apertura);
      // console.log(this.sucursales[0].hora_cierre);
    });
  }
  onDeleteUser(id: number): void {
    if (confirm('Esta seguro que quiere eliminar?')) {
      this.sucursalService.delete(id).subscribe(user => {
        this.getLisSucursal();
      });
    }
  }
  changePage(event: any): void {
    this.currentPage = event.page;
    if (this.keyword || this.tipo) {
      this.searchByKeyword();
    } else {
      this.getLisSucursal();
    }
  }
  searchByTipo(tipo?: any){
    this.tipo = tipo;
    this.sucursalService.getlisTipos(this.currentPage - 1, this.pageSize, this.tipo, this.keyword).subscribe(sucursalTipo => {
      this.totalItems = sucursalTipo.elements;
      this.sucursales = sucursalTipo.sucursal.rows;
      // console.log(sucursalTipo.sucursal.rows);
    });
  }
  searchByKeyword(){
    // console.log('===============>', this.keyword);
    this.sucursalService.getlisTipos(this.currentPage - 1, this.pageSize, this.tipo, this.keyword).subscribe(sucursalTipo => {
      this.totalItems = sucursalTipo.elements;
      this.sucursales = sucursalTipo.sucursal.rows;
      // console.log(this.sucursales);
    });
  }
}
