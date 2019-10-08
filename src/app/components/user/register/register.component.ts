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
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
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
        console.log('Resgistro con Exito');
      },
      (err) => {
        console.log('Error al crear un Usuario', err);
      }
    );
  }

}
