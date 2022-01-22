import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appointment } from 'src/app/interfaces/appointment';
import { patAppBlock, patient } from 'src/app/interfaces/blocklist-entry';
import { DoctorService } from 'src/app/services/doctor.service';
import { StatefulNavigationService } from 'src/app/services/stateful-navigation.service';
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-all-appointments',
  templateUrl: './all-appointments.component.html',
  styleUrls: ['./all-appointments.component.css']
})
export class AllAppointmentsComponent implements OnInit {

  constructor(private ds: DoctorService, private router: Router, private sn: StatefulNavigationService) { }

  appointments: Appointment[] = [];
  patients: patient[] = [];
  blocks: patAppBlock[] = [];

  ngOnInit(): void {

    this.ds.getAppointments().subscribe(r => {
      this.appointments = r;

      this.ds.getMyPatients().subscribe(p => {
        this.patients = p;

        this.createBlocklists()
      }, er => {/* console.log(er) */})

    }, er => {/* console.log(er) */})


  }

  createBlocklists() {

    this.appointments.forEach(ap => {
      this.blocks.push({
        pat: this.patients.filter(p => p._id == ap.patient_id)[0],
        app: ap,
        actions: []
      })

      let last = this.blocks[this.blocks.length - 1];

      if(last.app.state == "booked")
        last.actions.push(
          { text: 'View', colorClass: '', clickFunc: () => {
            this.sn.setSelectedAppointment(last.app)
            this.sn.setSelectedPatient(last.pat)

            this.router.navigateByUrl(`/info/appointment/${last.app._id}`)
          }, validFunc: true }
        )

      /* add cancel on all appointments not complete */
      if(last.app.state != 'done' && last.app.state != 'cancelled')
        last.actions.push(
          { text: 'Cancel', colorClass: 'button-red btn-last', clickFunc: () => {

            this.ds.setNewAppointmentState('cancelled', last.app._id).subscribe(r => {

              this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
                this.router.navigateByUrl('/doctor/appointments');
              })
            })
          }, validFunc: true }
        )

    })

    this.sortBlocks();
  }

  sortBlocks() {

    this.blocks.sort((a, b) => {
      if(a.app._id > b.app._id) return -1;
      return 1;
    })
  }

  saveToPdf() {
    let doc = new jsPDF();

    doc.setFontSize(30)
    doc.text("Your Appointments so far:", 10, 15);

    doc.setFontSize(12)
    let startHeight = 30;

    this.blocks.forEach(b => {

      doc.text(`Appointment on ${b.app.date.split('T')[0]} at ${b.app.date.split('T')[1].substring(0, b.app.date.split('T')[1].length - 1)} for ${b.app.duration} minutes. Paying: ${b.app.price} €`, 10 ,startHeight)
      startHeight +=10;
      doc.text(`State: ${b.app.state}`, 12 ,startHeight)
      startHeight +=10;
    })
    doc.save("appointments.pdf");
  }
}
