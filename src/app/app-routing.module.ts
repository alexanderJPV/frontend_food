import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { BodywebComponent } from './components/home_web/bodyweb/bodyweb.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: NavbarComponent,
    outlet: 'navbar'
  },
  {
    path: '',
    redirectTo: 'home_web/bodyweb',
    pathMatch: 'full'
  },
  {
    path: 'home_web/bodyweb',
    component: BodywebComponent
  },
  {
    path: 'user/register',
    component: RegisterComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
