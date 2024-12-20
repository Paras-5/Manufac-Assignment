export interface RawCropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": string | number ;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))":string | number ;
    "Area Under Cultivation (UOM:Ha(Hectares))": string | number;
  }
  
  export interface CropData {
    year: number;
    crop: string;
    production: number;
    yield: number;
    cultivationArea: number;
  }
  
  export interface AggregatedData {
    year: number;
    maxCrop: string;
    minCrop: string;
  }
  
  export interface CropAverage {
    crop: string;
    avgYield: number;
    avgCultivationArea: number;
  }
  