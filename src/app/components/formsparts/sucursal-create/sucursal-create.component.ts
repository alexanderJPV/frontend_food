import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SucursalService } from 'src/app/services/sucursal.service';

@Component({
  selector: 'app-sucursal-create',
  templateUrl: './sucursal-create.component.html',
  styleUrls: ['./sucursal-create.component.css']
})
export class SucursalCreateComponent implements OnInit {
  public sucursalFormGroup: FormGroup;
  public submitted: any = false;
  public fileData: File = null;
  public imageUrl: any;
  public id: any;
  // public sucursalFormGroup: FormGroup;
  // public submitted: any = false;
  // public receivedChildMessage: string;
  // public fileData: File = null;
  // public imageUrl: any;
  // public id: any;
  // public roles: any;

  constructor(
    private sucursalService: SucursalService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialData();
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.sucursalService.get(this.id).subscribe(
        (resTwo) => {
          console.log(resTwo);
        /*   this.imageUrl = resTwo.imagen;
          this.userFormGroup.setValue(resTwo);
          this.userFormGroup.patchValue({
            rol: resTwo.rol[0]
          }); */
        }
      );
    }
    console.log(this.id);
  }

  ngOnInit() {
  }
  onSubmit() {
    this.submitted = true;
    if (this.sucursalFormGroup.invalid) {
      console.log("error de validacion.............................");
      return;
    }
    const formData = new FormData();
    // if (this.fileData === null || this.fileData === undefined) {
    //   formData.append('imageUpload', null);
    //   formData.append('type', this.formValue.type);
    //   formData.append('name', this.formValue.name);
    // } else {
    //   formData.append('imageUpload', this.fileData);
    //   formData.append('type', this.fileData.type);
    //   formData.append('name', this.fileData.name);
    // }

    formData.append('razon_social', this.formValue.razon_social);
    formData.append('telefono', this.formValue.telefono);
    formData.append('descripcion', this.formValue.descripcion);
    formData.append('hora_apertura', this.formValue.hora_apertura);
    formData.append('hora_cierre', this.formValue.hora_cierre);

    // if (this.id) {
    //   this.updateUser(formData);
    // } else {
    //   this.createUser(formData);
    // }
  }
  initialData() {
    this.sucursalFormGroup = this.formBuilder.group({
      id: [null],
      razon_social: ['', [Validators.required]],
      telefono:['', [Validators.required, Validators.pattern('[0-9]*')]],
      descripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 _-]*')]],
      tipo: ['', [Validators.required]],
      nit: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      hora_apertura: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9: _-]*')]],
      hora_cierre: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9: _-]*')]],
      dias: [''],
      direccion: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 #.-]*')]],
      // latitud: ['', [Validators.required]],
      // longitud: ['', [Validators.required]]
    });
  }
  get formControls() {
    return this.sucursalFormGroup.controls;
  }
  get formValue() {
    return this.sucursalFormGroup.value;
  }
  cancelar(){
    this.router.navigate(['/admin/sucursal-list']);
  }
}