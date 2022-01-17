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
import { BlocklistDoctorEntryComponent } from './general/blocklist-entry_doctor/blocklist-entry_doctor.component';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './pages/register/register.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NavBarComponent } from './general/nav-bar/nav-bar.component';
import { BlocklistEntryPatientComponent } from './general/blocklist-entry-patient/blocklist-entry-patient.component';
import { PatientIndexComponent } from './pages/patient-index/patient-index.component';
import { PatientMydoctorsComponent } from './pages/patient-mydoctors/patient-mydoctors.component';
import { PatientMybloodtestsComponent } from './pages/patient-mybloodtests/patient-mybloodtests.component';
import { DoctorIndexComponent } from './pages/doctor-index/doctor-index.component';
import { DoctorAppointmentsComponent } from './pages/doctor-appointments/doctor-appointments.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IndexComponent,
    FooterComponent,
    HeaderLoggedComponent,
    LoginComponent,
    FindDoctorsComponent,
    BlocklistDoctorEntryComponent,
    RegisterComponent,
    AdminComponent,
    NavBarComponent,
    BlocklistEntryPatientComponent,
    PatientIndexComponent,
    PatientMydoctorsComponent,
    PatientMybloodtestsComponent,
    DoctorIndexComponent,
    DoctorAppointmentsComponent
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
