import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.css']
})
export class ActivateAccountComponent implements OnInit {

  constructor(
    private activatedRouter: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activatedRouter.queryParamMap.subscribe(
      (params) => {
        console.log('El parametro', params['params'].key);
        const key = params['params'].key;
        console.log('----------------____?????????????? ', key);
        if (key) {
          this.authService.activateAccount({ 'key': key }).subscribe(
            (res) => {
              console.log('El resultado fue exitoso');
            },
            (err) => {
              console.log('La llave a expirado', err);
            }
          )
        } else {
          console.log('No esxite el params');
        }
      }
    );
  }

}
