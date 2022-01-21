import { StringMap } from "@angular/compiler/src/compiler_facade_interface";

export interface BlocklistEntry_doctor {

  id: number,
  name: string,
  location: string,
  number: string,
  specialty?: string,
  more?: string,
  isCertified: number,

  original_index: number,

  actions?: Actions[]
}

export interface doctor {
  _id: number,
  username: string,
  firstname: string,
  lastname: string,
  birthdate: string,
  gender: string,
  amka: string,
  country: string,
  city: string,
  address: string,
  lat: number,
  lon: number,
  telephone: string,
  height: number,
  weight: number,
  blooddonor: number,
  bloodtype: string,
  specialty: string,
  doctor_info: string,
  certified: number
}

export interface BlocklistEntry_patient {

  id: number,
  name: string,
  location: string,
  number: string,
  birthdate?: string,
  weight?: number,
  height?: number,

  original_index: number,

  actions?: Actions[]
}

export interface patient {
  _id: number,
  username: string,
  firstname: string,
  lastname: string,
  birthdate: string,
  gender: string,
  amka: string,
  country: string,
  city: string,
  address: string,
  lat: number,
  lon: number,
  telephone: string,
  height: number,
  weight: number,
  blooddonor: number,
  bloodtype: string,
}

export interface patBlock {
  pat: patient,
  actions: Actions[]
}

export interface Actions {

  clickFunc: () => void,
  validFunc?: boolean,
  colorClass: string,
  text: string
}
