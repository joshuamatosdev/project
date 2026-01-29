import { Artillery, Infantry, MapPlace, Prediction } from './artillery.types';

export interface GmapProps {
  toggle: boolean;
  message: string;
  artillery: Artillery[];
  infantry: Infantry[];
  currentArt: string;
  currentArtRange: number;
  currentRPM: number;
  currentFriend: boolean;
  currentFacts: string;
  currentInfantry: string;
  currentInfantryRange: number;
  currentInfantryRPM: number;
  currentInfantryFriend: boolean;
  currentInfantryFacts: string;
  prediction: Prediction;
  imageDetected: boolean;
  haversine_distance: (mk1: MapPlace, mk2: MapPlace) => void;
  midpoint: (lat1: number, lng1: number, lat2: number, lng2: number) => { lat: number; lng: number };
  arePointsNear: (checkPoint: MapPlace, centerPoint: MapPlace, km: number) => boolean;
  setElevatorFunc: (elevation: any) => void;
  setCurrentGridFunc: (coords: { lat: number; lng: number }) => void;
  setMessageFunc: (msg: string) => void;
  incrementCount: () => void;
  predictionService: (vehicle: Prediction) => void;
  toggleImageDetected: (val: boolean) => void;
}

export interface ObjectDetectVProps {
  predictionService: (vehicle: Prediction) => void;
  toggleImageDetected: (val: boolean) => void;
}
