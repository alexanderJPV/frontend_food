import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userFormGroup: FormGroup;
  submitted: any = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.initialData();
  }

  ngOnInit() {
  }

  initialData() {
    this.userFormGroup = this.formBuilder.group({
      nombres: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50),Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50),Validators.pattern('[a-zA-Z ]*')]],
      userName: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(20),Validators.pattern('[a-zA-Z0-9 _-]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, Validators.minLength(5),Validators.maxLength(100)]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userFormGroup.invalid) {
      return;
    }
    this.register();
  }

  get formValue() {
    return this.userFormGroup.value;
  }

  get formControls() {
    return this.userFormGroup.controls;
  }

  register() {
    const data = Object.assign({}, this.formValue);
    this.authService.register(data).subscribe(
      (res) => {
        console.log('Registro con Exito');
      },
      (err) => {
        console.log('Error al crear un Usuario', err);
      }
    );
  }

}
