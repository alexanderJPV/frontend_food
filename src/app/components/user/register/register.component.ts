import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { AuthorizationService } from 'src/app/services/authorization.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  userFormGroup: FormGroup;
  submitted: any = false;
  public correo: any;
  public registerError: any;
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private authServiceSocial: AuthService,
    private authApp: AuthorizationService,
    private router: Router
  ) {
    this.initialData();
  }

  ngOnInit() {
    this.authServiceSocial.authState.subscribe(async (user) => {
      console.log('Este es el usuario --> ', user);
      this.user = await user;
      await this.authApp.registerSocial(this.user).subscribe(
        (res) => {
          console.log('PASO el registtro');
          this.logout();
          localStorage.setItem('food-token', res.token);
          this.authApp.getAccount().subscribe(
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
          this.router.navigate(['/']);
        },
        (err) => {
          console.log('ESTE ES UN ERROR', err);
        }
      );
      this.loggedIn = (user != null);
    });
  }

  initialDataVoice() {
    this.userFormGroup = this.formBuilder.group({
      nombres: ['', [Validators.minLength(3), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      userName: ['', [Validators.minLength(3), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9 _-]*')]],
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(5), Validators.maxLength(100)]]
    });
  }
  initialData() {
    this.userFormGroup = this.formBuilder.group({
      nombres: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      apellidos: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]],
      userName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9 _-]*')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]]
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
    // console.log(data.email);
    this.userService.register(data).subscribe(
      (res) => {
        this.correo = data.email;
        this.initialDataVoice();
        console.log('Registro con Exito');
      },
      (err) => {
        // console.log('Error al registrar un Usuario', err);
        if (err.error.details) {
          this.registerError = err.error.details.message;
          // console.log(err.error.details.errors['0'].message);
          console.log(this.registerError);
        } else {
          this.registerError = err.error;
          console.log(this.registerError);
        }
      }
    );
  }

  // Register with login social

  signInWithGoogle(): void {
    this.authServiceSocial.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  // signInWithFB(): void {
  //   this.authServiceSocial.signIn(FacebookLoginProvider.PROVIDER_ID);
  // }

  signOut(): void {
    this.authServiceSocial.signOut();
  }

  logout() {
    this.authApp.logout();
  }

}
