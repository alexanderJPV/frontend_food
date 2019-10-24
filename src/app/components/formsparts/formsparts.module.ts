import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserCreateComponent } from './user-create/user-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SucursalCreateComponent } from './sucursal-create/sucursal-create.component';

@NgModule({
  declarations: [
    UserCreateComponent,
    SucursalCreateComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    UserCreateComponent,
    SucursalCreateComponent
  ]
})
export class FormspartsModule { }
