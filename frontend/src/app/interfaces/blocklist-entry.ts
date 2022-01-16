import { Actions } from "./actions";

export interface BlocklistEntry {

  id: number,
  name: string,
  location: string,
  number: string,
  specialty?: string,
  more?: string,

  actions?: Actions[]
}
