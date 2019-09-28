import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userFromGroup: FormGroup
  submitted: any = false;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.initialFroms();
  }

  ngOnInit() {
  }

  get formControls() {
    return this.userFromGroup.controls;
  }

  get formValue() {
    return this.userFromGroup.value;
  }

  initialFroms() {
    this.userFromGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      // authorities: [[]]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userFromGroup.invalid) {
      return;
    }
    console.log('Estos son los datos que pasan ---> ', this.formValue);
    this.login();
  }

  login() {
    this.authService.login(this.formValue).subscribe(
      (res) => {
        console.log('El logeo fue exitoso', res);
      },
      (error) => {
        console.log('Hay un error');
      }
    )
  }

}
