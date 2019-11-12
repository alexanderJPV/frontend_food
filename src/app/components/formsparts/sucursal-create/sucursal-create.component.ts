import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
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
  public lunes: boolean;
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
    private cd: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialData();
    // this.id = this.activatedRoute.snapshot.params['id'];
    // if (this.id) {
    //   this.sucursalService.get(this.id).subscribe(
    //     (resTwo) => {
    //       console.log(resTwo);
    //     /*   this.imageUrl = resTwo.imagen;
    //       this.userFormGroup.setValue(resTwo);
    //       this.userFormGroup.patchValue({
    //         rol: resTwo.rol[0]
    //       }); */
    //     }
    //   );
    // }
    // console.log(this.id);
  }

  ngOnInit() {

  }
  fileProgress(fileInput: any) {
    let reader = new FileReader();
    this.fileData = <File>fileInput.target.files[0];
    if (fileInput.target.files && fileInput.target.files[0]) {
      reader.readAsDataURL(this.fileData);
      reader.onload = () => {
        this.imageUrl = reader.result;
      }
      this.cd.markForCheck();
    }
  }
  onSubmit() {
    this.submitted = true;
    if (this.sucursalFormGroup.invalid) {
      console.log("error de validacion.............................");
      return;
    }
    const formData = new FormData();
    if (this.fileData === null || this.fileData === undefined) {
      formData.append('imageUpload', null);
      formData.append('type', this.formValue.type);
      formData.append('name', this.formValue.name);
    } else {
      formData.append('imageUpload', this.fileData);
      formData.append('type', this.fileData.type);
      formData.append('name', this.fileData.name);
    }
    this.lunes = this.formValue.lunes? true:false;
    let martes = this.formValue.martes? true:false;
    let miercoles = this.formValue.miercoles? true:false;
    let jueves = this.formValue.jueves? true:false;
    let viernes = this.formValue.viernes? true:false;
    let diasaux = {
      lunes : this.lunes,
      martes : martes,
      miercoles : miercoles,
      jueves : jueves,
      viernes : viernes
    }
    let diasset = JSON.stringify(diasaux);
    let hora_aperlunes = this.formValue.lunesha? this.formValue.lunesha: '';
    let hora_apermartes = this.formValue.martesha? this.formValue.martesha: '';
    let hora_apermiercoles = this.formValue.miercolesha? this.formValue.miercolesha: '';
    let hora_aperjueves = this.formValue.juevesha? this.formValue.juevesha: '';
    let hora_aperviernes = this.formValue.viernesha? this.formValue.viernesha: '';
    let hora_aperturaaux = {
      hora_aperlunes: hora_aperlunes,
      hora_apermartes: hora_apermartes,
      hora_apermiercoles: hora_apermiercoles,
      hora_aperjueves: hora_aperjueves,
      hora_aperviernes: hora_aperviernes
    }
    let hora_aperturaset = JSON.stringify(hora_aperturaaux);
    let hora_cierrlunes = this.formValue.luneshc? this.formValue.luneshc: '';
    let hora_cierrmartes = this.formValue.marteshc? this.formValue.marteshc: '';
    let hora_cierrmiercoles = this.formValue.miercoleshc? this.formValue.miercoleshc: '';
    let hora_cierrjueves = this.formValue.jueveshc? this.formValue.jueveshc: '';
    let hora_cierrviernes = this.formValue.vierneshc? this.formValue.vierneshc: '';
    let hora_cierreaux = {
      hora_cierrlunes: hora_cierrlunes,
      hora_cierrmartes: hora_cierrmartes,
      hora_cierrmiercoles: hora_cierrmiercoles,
      hora_cierrjueves: hora_cierrjueves,
      hora_cierrviernes: hora_cierrviernes
    }
    let hora_cierreset = JSON.stringify(hora_cierreaux);
    // console.log(hora_cierreset);
    // console.log(diasaux);
    // console.log(hora_aperturaaux);
    formData.append('razon_social', this.formValue.razon_social);
    formData.append('telefono', this.formValue.telefono);
    formData.append('descripcion', this.formValue.descripcion);
    formData.append('tipo', this.formValue.tipo);
    formData.append('nit', this.formValue.nit);
    formData.append('direccion', this.formValue.direccion);
    formData.append('dias', diasset);
    formData.append('hora_apertura', hora_aperturaset);
    formData.append('hora_cierre', hora_cierreset);

    this.createSucursal(formData);
  }
  initialData() {
    this.sucursalFormGroup = this.formBuilder.group({
      id: [null],
      razon_social: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      descripcion: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9 _-]*')]],
      tipo: ['', [Validators.required]],
      nit: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      direccion: ['',[Validators.required]],
      imagen: [''],
      type: [''],
      name: [''],
      lunes: [''],
      lunesha: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      luneshc: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      martes: [''],
      martesha: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      marteshc: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      miercoles: [''],
      miercolesha: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      miercoleshc: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      jueves: [''],
      juevesha: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      jueveshc: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      viernes: [''],
      viernesha: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      vierneshc: ['',Validators.pattern('[a-zA-Z0-9 :_-]*')],
      latitud: [''],
      longitud: [''],
      relacion_usuario: ['']
      // hora_apertura:['',[Validators.required, Validators.pattern('[a-zA-Z0-9 :_-]*')]],
      // hora_cierre:['',[Validators.required, Validators.pattern('[a-zA-Z0-9 :_-]*')]]
    });
  }

  get formControls() {
    return this.sucursalFormGroup.controls;
  }
  get formValue() {
    return this.sucursalFormGroup.value;
  }

  createSucursal(valueFormData: any) {
    this.sucursalService.create(valueFormData).subscribe(
      (res) => {
        console.log('Exito al crear');
        this.router.navigate(['/admin/sucursal-list']);
      },
      (err) => {
        console.log('Create Error............................................');
      }
    );
  }

  cancelar() {
    this.router.navigate(['/admin/sucursal-list']);
  }
}
