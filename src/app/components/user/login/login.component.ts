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
  public loginError: any;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
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
      password: ['', [Validators.required, Validators.minLength(5)]],
      rememberMe: [true]
    });
  }
  onSubmit() {
    this.submitted = true;
    if (this.userFromGroup.invalid) {
      return;
    }
    this.login();
  }

  login() {
    const user = Object.assign({}, this.formValue);
    this.authService.login(user).subscribe(
      (res) => {
        this.logout();
        if (this.formValue.rememberMe) {
          localStorage.setItem('food-token', res.token);
        } else {
          sessionStorage.setItem('food-token', res.token);
        }
        this.authService.getAccount().subscribe(
          (res) => {
            const data = res.rol.includes('ROL_ADMIN');
            if (data) {
              this.router.navigate(['/admin/dashboard']);
            } else {
              this.router.navigate(['/home_web/bodyweb']);
            }
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        // console.log(err.error.details);
        this.loginError = err.error.details;
        console.log(this.loginError);
        console.log('------------------Hay un error-----------------');
      }
    );
  }
  logout() {
    this.authService.logout();
  }

}
