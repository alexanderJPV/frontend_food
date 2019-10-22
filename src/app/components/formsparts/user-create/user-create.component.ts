import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public userFormGroup: FormGroup;
  public submitted: any = false;
  public receivedChildMessage: string;
  public fileData: File = null;
  public imageUrl: any;
  public id: any;
  public roles: any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initialData();
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id) {
      this.userService.get(this.id).subscribe(
        (resTwo) => {
          this.imageUrl = resTwo.imagen;
          this.userFormGroup.setValue(resTwo);
          this.userFormGroup.patchValue({
            rol: resTwo.rol[0]
          });
        }
      );
    }
  }

  ngOnInit() {
    this.showRoles();
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
    if (this.userFormGroup.invalid) {
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

    formData.append('userName', this.formValue.userName);
    formData.append('email', this.formValue.email);
    formData.append('nombres', this.formValue.nombres);
    formData.append('apellidos', this.formValue.apellidos);
    formData.append('rol', this.formValue.rol);
    formData.append('estado', this.formValue.estado);
    formData.append('password', this.formValue.password);
    formData.append('genero', this.formValue.genero);
    formData.append('id', this.formValue.id);
    formData.append('telefono', this.formValue.telefono);
    formData.append('fechaNacimiento', this.formValue.fechaNacimiento);

    if (this.id) {
      this.updateUser(formData);
    } else {
      this.createUser(formData);
    }
  }
  initialData() {
    /* La validacion aqui*/
    this.userFormGroup = this.formBuilder.group({
      id: [null],
      nombres: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50),Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50),Validators.pattern('[a-zA-Z ]*')]],
      userName: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('[a-zA-Z0-9 _-]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5),Validators.maxLength(100)]],
      imagen: [''],
      rol: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      estado: ['',[Validators.required]],
      type: [''],
      name: [''],
      fechaNacimiento: ['',[Validators.required]],
      telefono: ['', [Validators.required,Validators.minLength(7),Validators.maxLength(8),Validators.pattern('[0-9]*')]],
      activate_key: [''],
      reset_key: [''],
      createdAt: [null],
      updatedAt: [null]
    });
  }

  get formControls() {
    return this.userFormGroup.controls;
  }

  get formValue() {
    return this.userFormGroup.value;
  }

  createUser(valueFormData: any) {
    this.userService.create(valueFormData).subscribe(
      (res) => {
        this.showNotification('top', 'center',"Usuario añadido exitosamente!!!",2);
        this.router.navigate(['/admin/user-list']);
      },
      (err) => {
        console.log('Create Error............................................');
        const erromensaje = err.error.details.message;
        // console.log(err.error.details.message);
        this.showNotification('top', 'center',erromensaje,4);
      }
    );
  }

  updateUser(valueFormData: any) {
    this.userService.update(valueFormData).subscribe(
      (res) => {
        this.showNotification('top','center',"Usuario editado exitosamente!!!",2);
        console.log('Actualizado con exito');
        this.router.navigate(['/admin/user-list']);
      },
      (err) => {
        console.log('Update Error.....................................');
        const erromensaje = err.error.details.message;
        // console.log(err.error.details.message);
        this.showNotification('top', 'center',erromensaje,4);
      }
    );
  }

  showRoles() {
    this.userService.roles().subscribe(
      (res) => {
        this.roles = res;
      }
    );
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
  cancelar(){
    this.router.navigate(['/admin/user-list']);
  }
}