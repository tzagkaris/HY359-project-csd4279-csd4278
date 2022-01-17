export interface BlocklistEntry_doctor {

  id: number,
  name: string,
  location: string,
  number: string,
  specialty?: string,
  more?: string,
  isCertified: number,

  actions?: Actions[]
}

export interface BlocklistEntry_patient {

  id: number,
  name: string,
  location: string,
  number: string,
  birthdate?: string,
  weight?: number,
  height?: number,

  actions?: Actions[]
}

export interface Actions {

  clickFunc: () => void,
  validFunc?: boolean,
  colorClass: string,
  text: string
}
