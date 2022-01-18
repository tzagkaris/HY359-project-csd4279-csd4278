import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './guards/auth-admin.guard';
import { AuthDoctorGuard } from './guards/auth-doctor.guard';
import { AuthPatientGuard } from './guards/auth-patient.guard';
import { AdminComponent } from './pages/admin/admin.component';
import { DoctorAppointmentsComponent } from './pages/doctor-appointments/doctor-appointments.component';
import { DoctorIndexComponent } from './pages/doctor-index/doctor-index.component';
import { IndexComponent } from './pages/index/index.component';
import { PatientIndexComponent } from './pages/patient-index/patient-index.component';
import { PatientMybloodtestsComponent } from './pages/patient-mybloodtests/patient-mybloodtests.component';
import { PatientMydoctorsComponent } from './pages/patient-mydoctors/patient-mydoctors.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path: 'index', component: IndexComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuard]},
  {path: 'patient/index', component: PatientIndexComponent, canActivate: [AuthPatientGuard]},
  {path: 'patient/mybloodtests', component: PatientMybloodtestsComponent, canActivate: [AuthPatientGuard]},
  {path: 'patient/mydoctors', component: PatientMydoctorsComponent, canActivate: [AuthPatientGuard]},
  {path: 'doctor/index', component: DoctorIndexComponent, canActivate: [AuthDoctorGuard]},
  {path: 'doctor/appointments', component: DoctorAppointmentsComponent, canActivate: [AuthDoctorGuard]},
  {path: '**', redirectTo: 'index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
