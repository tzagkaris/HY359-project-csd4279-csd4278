import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BlocklistEntry_doctor, BlocklistEntry_patient, doctor, patient } from '../interfaces/blocklist-entry';
import { HttpAdminService } from './http-admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _http: HttpAdminService, private _router: Router) { }

  getUsers() {

    return this._http.getUsers();
  }

  removeUser(amka: string) {

    return this._http.removeUser(amka);
  }

  certifyDoctor(amka: string) {

    return this._http.certifyDoc(amka);
  }

  to_blocklistDoctors(docs: doctor[]) {

    let finalList: BlocklistEntry_doctor[] = []

    docs.forEach((element, index) => {
      finalList.push(
        {
        original_index: index,
        isCertified: element.certified,
        name: element.lastname + ' ' + element.firstname,
        location: `${element.address}, ${element.city}, ${element.country}`,
        number: `+30 ${element.telephone}`,
        specialty: element.specialty,
        id: element._id,
        more: `- ${element.doctor_info}`,
        actions: [
          {text: "Delete", colorClass: "button-red", validFunc: true, clickFunc: () => {

            this._http.removeUser(element.amka).subscribe(res => {
              this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this._router.navigate(['/admin']));
            }, er => {

              /* might do something fancy later */
              console.log(er)
            })
          } },
        ]
      })

      if(!element.certified)
        finalList[finalList.length - 1].actions?.push(
          {text: "Certify", colorClass: "button-green", validFunc: true,clickFunc: () => {

            this._http.certifyDoc(element.amka).subscribe(res => {
              this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this._router.navigate(['/admin']));
            }, er => {

              /* might do something fancy later */
              console.log(er)
            })
          }
        }
        )
    })

   return finalList;
  }

  to_blocklistPatients(pats: patient[]) {

    let finalList: BlocklistEntry_patient[] = [];

    pats.forEach((element, index) => {

      finalList.push({
        original_index: index,
        id: element._id,
        name: element.lastname + ' ' + element.firstname,
        location: `${element.address}, ${element.city}, ${element.country}`,
        number: `+30 ${element.telephone}`,
        birthdate: element.birthdate.split('T')[0],
        actions: [
          {text: "Delete", colorClass: "button-red", validFunc: true, clickFunc: () => {

            this._http.removeUser(element.amka).subscribe(res => {
              this._router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
              this._router.navigate(['/admin']));
            }, er => {

              /* might do something fancy later */
              console.log(er)
            })
          } },
        ]
      })
    })

    return finalList;
  }
}
