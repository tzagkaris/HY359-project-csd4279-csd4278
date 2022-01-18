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

  docs_toBlocklist(docs: doctor[], logState: boolean) {

    let certDocs: BlocklistEntry_doctor[] = []

    docs.forEach((element: doctor) => {
      certDocs.push(
        {isCertified: 1,
        name: element.lastname + ' ' + element.firstname,
        location: `${element.address}, ${element.city}, ${element.country}`,
        number: `+30 ${element.telephone}`,
        specialty: element.specialty,
        id: element._id,
        more: `- ${element.doctor_info}`,
        actions: [
          {text: "Map", colorClass: "button-green",clickFunc: () => {} },
          {text: "More", colorClass: "",clickFunc: () => {} },
        ]
      })
    })

    return certDocs;
  }
}
