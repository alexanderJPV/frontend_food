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
import { PaginationModule } from 'ngx-bootstrap';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("306788124293-2ep7vm6epihoircs80m5hk0dtl1nls0r.apps.googleusercontent.com")
  },
  // {
  //   id: FacebookLoginProvider.PROVIDER_ID,
  //   provider: new FacebookLoginProvider("Facebook-App-Id")
  // }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    BodywebComponent,
    AdminLayoutComponent,
    FavoriteFoodComponent,
    PromotionsComponent,
    ActivateAccountComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    ItemsAdminModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    SocialLoginModule,
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
