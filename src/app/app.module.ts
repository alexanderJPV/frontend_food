import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { BodywebComponent } from './components/home_web/bodyweb/bodyweb.component';

import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { HttpClientModule } from '@angular/common/http';
import { ItemsAdminModule } from './components/items_admin/items-admin.module';

import { FavoriteFoodComponent } from './components/home_web/favorite-food/favorite-food.component';
import { PromotionsComponent } from './components/home_web/promotions/promotions.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    BodywebComponent,
    AdminLayoutComponent,
    FavoriteFoodComponent,
    PromotionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ItemsAdminModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
