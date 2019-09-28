import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardAdminComponent } from '../../dashboard-admin/dashboard-admin.component';
import { UserListComponent } from '../../user-list/user-list.component';
import { MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [
    DashboardAdminComponent,
    UserListComponent
  ],
  imports: [
    CommonModule
  ]
})


export class AdminLayoutModule { }
