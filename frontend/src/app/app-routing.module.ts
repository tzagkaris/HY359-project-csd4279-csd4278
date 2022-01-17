import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  {path: 'admin', component: AdminComponent},
  {path: 'patient/index', component: PatientIndexComponent},
  {path: 'patient/mybloodtests', component: PatientMybloodtestsComponent},
  {path: 'patient/mydoctors', component: PatientMydoctorsComponent},
  {path: 'doctor/index', component: DoctorIndexComponent},
  {path: 'doctor/appointments', component: DoctorAppointmentsComponent},
  {path: '**', redirectTo: 'index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
