import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SucursalService } from 'src/app/services/sucursal.service';
import { UserService } from './../../../services/user.service';
declare var $: any;
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
  public sw: any;
  public lunes: boolean;
  public martes: boolean;
  public miercoles: boolean;
  public jueves: boolean;
  public viernes: boolean;
  public tipos: any;
  public usuarios: any[];

  // ----------------- example
  public selecteduser: any;
  constructor(
    private sucursalService: SucursalService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialData();
    // console.log(this.activatedRoute.snapshot.params['id']);
    // console.log(this.activatedRoute.snapshot.params['ax']);
    this.id = this.activatedRoute.snapshot.params['id'];
    this.sw = this.activatedRoute.snapshot.params['ax'];
    if (this.id) {
      this.userService.getAll(0,100).subscribe(users => {
        this.usuarios = users.usuario.rows;
        // console.log(this.usuarios);
      });
      this.sucursalService.get(this.id).subscribe((resTwo) =>
       {
          // console.log(resTwo);
          // console.log(resTwo.dias[0]);
          this.imageUrl = resTwo.imagen;
          // console.log(this.imageUrl);
          this.sucursalFormGroup.patchValue({
            razon_social: resTwo.razon_social,
            telefono: resTwo.telefono,
            descripcion: resTwo.descripcion,
            tipo: resTwo.tipo[0],
            nit: resTwo.nit,
            direccion: resTwo.direccion,
            lunes: resTwo.dias[0],
            lunesha: resTwo.hora_apertura[0],
            luneshc: resTwo.hora_cierre[0],
            martes: resTwo.dias[1],
            martesha: resTwo.hora_apertura[1],
            marteshc: resTwo.hora_cierre[1],
            miercoles: resTwo.dias[2],
            miercoleha: resTwo.hora_apertura[2],
            miercoleshc: resTwo.hora_cierre[2],
            jueves: resTwo.dias[3],
            juevesha: resTwo.hora_apertura[3],
            jueveshc: resTwo.hora_cierre[3],
            viernes: resTwo.dias[4],
            viernesha: resTwo.hora_apertura[4],
            viernesca: resTwo.hora_cierre[4],
            latitud: resTwo.latitud,
            longitud: resTwo.longitud
          });
        }
      );
    }
  }

  ngOnInit() {
    this.showTipos();
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
    this.martes = this.formValue.martes? true:false;
    this.miercoles = this.formValue.miercoles? true:false;
    this.jueves = this.formValue.jueves? true:false;
    this.viernes = this.formValue.viernes? true:false;
    let diasaux = {
      lunes : this.lunes,
      martes : this.martes,
      miercoles : this.miercoles,
      jueves : this.jueves,
      viernes : this.viernes
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
    formData.append('id',this.id);
    formData.append('razon_social', this.formValue.razon_social);
    formData.append('telefono', this.formValue.telefono);
    formData.append('descripcion', this.formValue.descripcion);
    formData.append('tipo', this.formValue.tipo);
    formData.append('nit', this.formValue.nit);
    formData.append('direccion', this.formValue.direccion);
    formData.append('dias', diasset);
    formData.append('hora_apertura', hora_aperturaset);
    formData.append('hora_cierre', hora_cierreset);
    formData.append('latitud',this.formValue.latitud);
    formData.append('longitud',this.formValue.longitud);
    // console.log('==============================================>');
    // console.log(this.id);
    if(this.id){
      this.updateSucursal(formData);
    }else{
      this.createSucursal(formData);
    }
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
      lunes: [false],
      lunesha: [''],
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
      latitud: ['',[Validators.required]],
      longitud: ['',[Validators.required]]
      // relacion_usuario: ['']
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
        this.showNotification('top', 'center',"Sucursal añadido exitosamente!!!",2);
        this.router.navigate(['/admin/sucursal-list']);
      },
      (err) => {
        console.log('Create Error.....................');
        this.showNotification('top', 'center',"Error al añadir Sucursal!!!",4);
      }
    );
  }
  updateSucursal(velueFormData: any){
    this.sucursalService.update(velueFormData).subscribe(
      (res) => {
        console.log('Exito al actualizar');
        this.showNotification('top', 'center',"Sucursal editado exitosamente!!!",2);
        this.router.navigate(['/admin/sucursal-list']);
      },
      (err) => {
        console.log('Update error......................');
        this.showNotification('top', 'center',"Error al editar Sucursal!!!",4);
        // console.log(err);
        // const erromensaje = err.error.details.message;
      }
    );
  }
  showTipos(){
    this.sucursalService.tipos().subscribe((res) => {
      this.tipos=res;
    });
  }
  showNotification(from, align, mensaje, colores) {
    const type = ['', 'info', 'success', 'warning', 'danger'];
    //1 => color azul
    //2 => color verde
    //3 => color anaranjado
    //4 => color rojo
    const color = colores;

    $.notify({
      icon: "notifications",
      message: mensaje

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
  cancelar() {
    this.router.navigate(['/admin/sucursal-list']);
  }
  relacion(){
    const userx = this.usuarios.find(userx => userx.userName==this.selecteduser);
    // console.log(userx.id);
    this.userService.get(userx.id).subscribe(
      userfind =>
      {
          console.log(userfind);
      }
    );
  }
}
