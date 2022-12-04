type FarmType = {
  id: number;
  farmName: string;
  farmCrop: string;
  createdDate: string;
  temperature: number;
  airHumidity: number;
  soilHumidity: number;
};

export type FarmLoadListResponseType = {
  totalPage: number;
  farmResponses: FarmType[];
};
