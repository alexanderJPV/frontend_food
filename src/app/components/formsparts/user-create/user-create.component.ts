import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    if (this.id) {
      this.updateUser(formData);
    } else {
      this.createUser(formData);
    }
  }

  initialData() {
    this.userFormGroup = this.formBuilder.group({
      id: [null],
      userName: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: [Validators.required],
      imagen: [''],
      rol: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      estado: [true],
      type: [''],
      name: [''],
      fechaNacimiento: [null],
      telefono: ['', [Validators.required]],
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
        this.router.navigate(['/admin/edit-user', res.id]);
      },
      (err) => {
        console.log('Error');
      }
    );
  }

  updateUser(valueFormData: any) {
    this.userService.update(valueFormData).subscribe(
      (res) => {
        console.log('Actualizado con exito');
      },
      (err) => {
        console.log('Error');
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

}
