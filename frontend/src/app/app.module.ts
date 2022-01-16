import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './general/header/header.component';
import { IndexComponent } from './pages/index/index.component';
import { FooterComponent } from './general/footer/footer.component';
import { HeaderLoggedComponent } from './general/header-logged/header-logged.component';
import { LoginComponent } from './general/login/login.component';
import { FindDoctorsComponent } from './general/find-doctors/find-doctors.component';
import { BlocklistEntryComponent } from './general/blocklist-entry/blocklist-entry.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    FooterComponent,
    HeaderLoggedComponent,
    LoginComponent,
    FindDoctorsComponent,
    BlocklistEntryComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
