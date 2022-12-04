export type FarmLoadResponseType = {
  id: number;
  farmName: string;
  farmCrop: string;
  createdDate: string;
  temperature: number;
  airHumidity: number;
  soilHumidity: number;
  isWater: number;
  isLight: number;
  lastCycleDate: number;
};
