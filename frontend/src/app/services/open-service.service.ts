import { Injectable } from '@angular/core';
import { BlocklistEntry_doctor, doctor } from '../interfaces/blocklist-entry';
import { HttpOpenService } from './http-open.service';

@Injectable({
  providedIn: 'root'
})
export class OpenServiceService {

  constructor(private openHttp: HttpOpenService) { }

  getDocs() {
    return this.openHttp.fetchCertified()
  }

  docs_toBlocklist_index(docs: doctor[]) {

    let certDocs: BlocklistEntry_doctor[] = []

    docs.forEach((element, index) => {
      certDocs.push(
        {
        original_index: index,
        isCertified: 1,
        name: element.lastname + ' ' + element.firstname,
        location: `${element.address}, ${element.city}, ${element.country}`,
        number: `+30 ${element.telephone}`,
        specialty: element.specialty,
        id: element._id,
        more: `- ${element.doctor_info}`,
        actions: [
          {text: "Map", colorClass: "button-green",clickFunc: () => {} },
        ]
      })
    })

    return certDocs;
  }

  docs_toBlocklist_patient(docs: doctor[]) {

    let certDocs = this.docs_toBlocklist_index(docs);

    certDocs.forEach(cdoc => {

      cdoc.actions?.push({
        /* don't want special function to run, just propagete button press */
        text: 'More', colorClass: '', validFunc: false, clickFunc: () => {}
      })
    })

    return certDocs;
  }

  registerUser(user: any) {

    return this.openHttp.registerUser(user);
  }

}
