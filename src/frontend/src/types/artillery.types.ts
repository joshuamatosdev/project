export interface Artillery {
  id: number;
  type: string;
  artRange: number;
  favorite: boolean;
  rpm: number;
  facts: string;
}

export interface Infantry {
  id: number;
  type: string;
  artRange: number;
  favorite: boolean;
  rpm: number;
  facts: string;
}

export interface MapPlace {
  lat: number;
  lng: number;
  type: string;
  range: number;
  facts?: string;
  rpm?: number;
  friendly?: boolean;
  currentArt?: string;
}

export interface Prediction {
  type: string;
  lat: number;
  lng: number;
}

export interface CocoSsdPrediction {
  class: string;
  score: number;
  bbox: [number, number, number, number];
}
