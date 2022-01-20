export interface Message {

  _id: number,
  doctor_id: number,
  patient_id: number,
  from: string,
  date: string,
  content: string,
  isRead: number,
  isReadPat: number
}
