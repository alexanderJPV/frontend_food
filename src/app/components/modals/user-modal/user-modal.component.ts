import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  userFormGroup: FormGroup;
  submitted: any = false;
  receivedChildMessage: string;
  fileData: File = null;
  @Output() messageToEmit = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private location: Location,
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef
  ) {
    this.initialData();
  }

  ngOnInit() {
  }

  imageUrl: any;

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
    formData.append('imageUpload', this.fileData);
    formData.append('type', this.fileData.type);
    formData.append('name', this.fileData.name);
    formData.append('userName', this.formValue.userName);
    formData.append('email', this.formValue.email);
    formData.append('nombres', this.formValue.nombres);
    formData.append('apellidos', this.formValue.apellidos);
    formData.append('rol', this.formValue.rol);
    formData.append('estado', this.formValue.estado);
    this.createUser(formData);
  }

  initialData() {
    this.userFormGroup = this.formBuilder.group({
      id: [null],
      userName: ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['2923929283'],
      imagen: '',
      rol: [['USER']],
//      genero: '',
      estado: [true]
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
        this.initialData();
        this.sendMessageToParent(true);
        this.closeModal();
        this.imageUrl = '';
      },
      (err) => {
        this.sendMessageToParent(false);
      }
    );
  }

  sendMessageToParent(message: any) {
    this.messageToEmit.emit(message)
  }

  closeModal() {
    document.getElementById('linkid').click();
  }

}
