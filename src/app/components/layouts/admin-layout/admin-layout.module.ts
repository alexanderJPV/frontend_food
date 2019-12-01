import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardAdminComponent } from '../../dashboard-admin/dashboard-admin.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { ModalsModule } from  '../../modals/modals.module';
import { SucursalComponent } from '../../sucursal/sucursal.component';
import {PlatoEspecialComponent} from '../../plato-especial/plato-especial.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule
} from '@angular/material';
import { AdminLayoutRoutes } from './admin-layout.router';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { FormspartsModule } from '../../formsparts/formsparts.module';
import { PaginationModule, TypeaheadModule } from 'ngx-bootstrap';
@NgModule({
  declarations: [
    DashboardAdminComponent,
    UserListComponent,
    UserProfileComponent,
    SucursalComponent,
    PlatoEspecialComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ModalsModule,
    FormspartsModule,
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot()
  ]
})
export class AdminLayoutModule { }
