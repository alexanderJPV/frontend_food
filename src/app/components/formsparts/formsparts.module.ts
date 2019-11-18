import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TypeaheadModule } from 'ngx-bootstrap';
import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SucursalCreateComponent } from './sucursal-create/sucursal-create.component';
import { PlatoespecialCreateComponent } from './platoespecial-create/platoespecial-create.component';

@NgModule({
  declarations: [
    UserCreateComponent,
    SucursalCreateComponent,
    PlatoespecialCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot()
  ],
  exports: [
    UserCreateComponent,
    SucursalCreateComponent,
    PlatoespecialCreateComponent
  ]
})
export class FormspartsModule { }
