import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sucursal-create',
  templateUrl: './sucursal-create.component.html',
  styleUrls: ['./sucursal-create.component.css']
})
export class SucursalCreateComponent implements OnInit {
  public sucursalFormGroup: FormGroup;
  public submitted: any = false;
  public id: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) { 

  }

  ngOnInit() {
    
  }

  initialData() {
    this.sucursalFormGroup = this.formBuilder.group({
      id: [null],
      razon_social: ['', [Validators.required]],
      telefono:['', [Validators.required], [Validators.pattern('0-9')]],
      descripcion: ['', [Validators.required], [Validators.pattern('a-zA-Z')]],
      tipo: ['', [Validators.required], [Validators.pattern('a-zA-Z')]],
      nit: ['', [Validators.required], [Validators.pattern('0-9')]],
      direccion: ['', [Validators.required], [Validators.pattern('a-zA-Z0-9 #.-')]],
      latitud: ['', [Validators.required]],
      longitud: ['', [Validators.required]]
    });
  }
  cancelar(){
    this.router.navigate(['/admin/sucursal-list']);
  }
}
