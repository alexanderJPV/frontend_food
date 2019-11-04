import { PlatoespService } from './../../services/platoesp.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-plato-especial',
  templateUrl: './plato-especial.component.html',
  styleUrls: ['./plato-especial.component.css']
})
export class PlatoEspecialComponent implements OnInit {
  public platos: any[];
  // valores por defecto;
  pageSize = 10;
  totalItems = 0;
  currentPage = 1;
  rotate = true;
  maxSize = 10;
  keyword: any = '';
  tipo: any = '';
  constructor(private router: Router, private platoespService:PlatoespService) { }

  ngOnInit() {
    this.getLisPlato();
  }

  getLisPlato(tipos?: any) {
    this.keyword = '';
    this.tipo = '';
    this.platoespService.getAll(this.currentPage - 1, this.pageSize).subscribe(platos => {
      console.log('-------------------');
      this.totalItems = platos.elements;
      this.platos = platos.plato.rows;
      console.log(this.platos);
    });
  }
}
