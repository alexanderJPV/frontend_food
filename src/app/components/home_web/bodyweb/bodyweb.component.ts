import { Component, OnInit } from '@angular/core';
import { SucursalService } from 'src/app/services/sucursal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bodyweb',
  templateUrl: './bodyweb.component.html',
  styleUrls: ['./bodyweb.component.css']
})
export class BodywebComponent implements OnInit {
  public sucursales: any[];
  // valores por defecto;
  pageSize = 10;
  totalItems = 0;
  currentPage = 1;
  rotate = true;
  maxSize = 10;
  keyword: any = '';
  tipo: any = '';
  constructor(private router: Router, private sucursalService: SucursalService)
  {

  }

  ngOnInit() {
    this.getLisSucursal();
  }
  getLisSucursal(tipos?: any) {
    this.keyword = '';
    this.tipo = '';
    this.sucursalService.getAll(this.currentPage - 1, this.pageSize).subscribe(sucursales => {
      this.totalItems = sucursales.elements;
      this.sucursales = sucursales.sucursal.rows;
      console.log(this.sucursales);
      // console.log(this.sucursales[0].dias);
      // console.log(this.sucursales[0].hora_apertura);
      // console.log(this.sucursales[0].hora_cierre);
    });
  }

}
