import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { UserModalComponent } from './user-modal/user-modal.component';


@NgModule({
  declarations: [
    UserModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    UserModalComponent
  ]
})
export class ModalsModule { }
