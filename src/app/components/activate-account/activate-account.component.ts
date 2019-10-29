import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  msgExito: any;
  msgError: any;

  constructor(
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRouter.queryParamMap.subscribe(
      (params) => {
        console.log('El parametro', params['params'].key);
        const key = params['params'].key;
        if (key) {
          this.authService.activateAccount({ 'key': key }).subscribe(
            (res) => {
              this.msgExito = 'Su cuenta fue activada con Exito';
            },
            (err) => {
              this.msgError = err.error.details;
            }
          )
        } else {
          this.msgError = 'La clave de acticacion no existe'
        }
      }
    );
  }

}
