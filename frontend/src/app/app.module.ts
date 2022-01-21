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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { DoctorInfoComponent } from './pages/doctor-info/doctor-info.component';
import { SelectedDoctorAppointmentsComponent } from './general/selected-doctor-appointments/selected-doctor-appointments.component';
import { AppointmentBlockComponent } from './general/appointment-block/appointment-block.component';
import { ChatComponent } from './general/chat/chat.component';
import { AddBloodtestComponent } from './general/add-bloodtest/add-bloodtest.component';
import { BloodtestListComponent } from './general/bloodtest-list/bloodtest-list.component';
import { MyAppointmentsComponent } from './general/my-appointments/my-appointments.component';
import { MyPatientsComponent } from './general/my-patients/my-patients.component';
import { PatientListEntryComponent } from './general/patient-list-entry/patient-list-entry.component';
import { PatientInfoComponent } from './pages/patient-info/patient-info.component';
import { TreatmentLatestComponent } from './general/treatment-latest/treatment-latest.component';
import { IncAppointmentsComponent } from './general/inc-appointments/inc-appointments.component';
import { AppointmentInfoComponent } from './pages/appointment-info/appointment-info.component';
import { AddTreatmentComponent } from './general/add-treatment/add-treatment.component';
import { NewAppointmentComponent } from './general/new-appointment/new-appointment.component';
import { AllAppointmentsComponent } from './general/all-appointments/all-appointments.component';
import { AppointmentPatblockComponent } from './general/appointment-patblock/appointment-patblock.component';

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
    DoctorAppointmentsComponent,
    DoctorInfoComponent,
    SelectedDoctorAppointmentsComponent,
    AppointmentBlockComponent,
    ChatComponent,
    AddBloodtestComponent,
    BloodtestListComponent,
    MyAppointmentsComponent,
    MyPatientsComponent,
    PatientListEntryComponent,
    PatientInfoComponent,
    TreatmentLatestComponent,
    IncAppointmentsComponent,
    AppointmentInfoComponent,
    AddTreatmentComponent,
    NewAppointmentComponent,
    AllAppointmentsComponent,
    AppointmentPatblockComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
