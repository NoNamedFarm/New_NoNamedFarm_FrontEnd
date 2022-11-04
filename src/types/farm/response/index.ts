export interface FarmType {
  temperature: number;
  humidity_atm: number;
  humidity_soil: number;
  is_water?: boolean;
  is_light?: boolean;
  name: string;
  crop: string;
  created_date: string;
}
