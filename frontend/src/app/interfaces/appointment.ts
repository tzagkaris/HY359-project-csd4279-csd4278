import { Actions } from "./blocklist-entry";

export interface Appointment {

  _id: number,
  doctor_id: number,
  patient_id: number,
  date: string,
  duration: number,
  price: number,
  state: number,
}

export interface AppointmentBlock {

  ap: Appointment,
  actions: Actions[]
}
