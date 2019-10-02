import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() messageToEmit = new EventEmitter<string>();

  constructor(
    private userService: UserService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.initialData();
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.userFormGroup.invalid) {
      return;
    }
    this.createUser();
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
      estado: [true]
    });
  }

  get formControls() {
    return this.userFormGroup.controls;
  }

  get formValue() {
    return this.userFormGroup.value;
  }

  createUser() {
    const data = Object.assign({}, this.formValue);
    this.userService.create(data).subscribe(
      (res) => {
        this.initialData();
        this.sendMessageToParent(true);
        this.closeModal();
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
