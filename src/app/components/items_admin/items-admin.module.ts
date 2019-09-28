import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminSidebarComponent } from './admin-sidebar/admin-sidebar.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminFooterComponent } from './admin-footer/admin-footer.component';

@NgModule({
  declarations: [
    AdminSidebarComponent,
    AdminNavbarComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    AdminSidebarComponent,
    AdminNavbarComponent,
    AdminFooterComponent
  ]
})
export class ItemsAdminModule { }
