export interface Bloodtest {

  _id: number,
  patient_id: number,
  date: string,
  iron: number,
  iron_lvl: string,
  blood_sugar: number,
  blood_sugar_lvl: string,
  vitamin_b12: number,
  vitamin_b12_lvl: string,
  vitamin_d3: number,
  vitamin_d3_lvl: string
}

export interface BloodtestBlock {

  bt: Bloodtest,
  perc: number,
  isLower: boolean,
  selectedRating: string,
  selectedRatingReading: number,
  selectedRatingRating: string,
  currentSrc: string,
}
