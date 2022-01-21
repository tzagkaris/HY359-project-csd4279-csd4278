import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './general/chat/chat.component';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthDoctorGuard } from './guards/auth-doctor.guard';
import { AuthPatientGuard } from './guards/auth-patient.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { AppointmentInfoComponent } from './pages/appointment-info/appointment-info.component';
import { DoctorAppointmentsComponent } from './pages/doctor-appointments/doctor-appointments.component';
import { DoctorIndexComponent } from './pages/doctor-index/doctor-index.component';
import { DoctorInfoComponent } from './pages/doctor-info/doctor-info.component';
import { IndexComponent } from './pages/index/index.component';
import { PatientIndexComponent } from './pages/patient-index/patient-index.component';
import { PatientInfoComponent } from './pages/patient-info/patient-info.component';
import { PatientMybloodtestsComponent } from './pages/patient-mybloodtests/patient-mybloodtests.component';
import { PatientMydoctorsComponent } from './pages/patient-mydoctors/patient-mydoctors.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard]},
  {path: 'patient/mybloodtests', component: PatientMybloodtestsComponent, canActivate: [AuthPatientGuard]},
  {path: 'patient/mydoctors', component: PatientMydoctorsComponent, canActivate: [AuthPatientGuard]},
  {path: 'patient/index', component: PatientIndexComponent, canActivate: [AuthPatientGuard]},
  {path: 'info/doctor/:id', component: DoctorInfoComponent, canActivate: [AuthPatientGuard]},
  {path: 'doctor/index', component: DoctorIndexComponent, canActivate: [AuthDoctorGuard]},
  {path: 'info/patient/:id', component: PatientInfoComponent, canActivate: [AuthDoctorGuard]},
  {path: 'info/appointment/:id', component: AppointmentInfoComponent, canActivate: [AuthDoctorGuard]},
  {path: 'doctor/appointments', component: DoctorAppointmentsComponent, canActivate: [AuthDoctorGuard]},
  {path: '**', redirectTo: 'index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
