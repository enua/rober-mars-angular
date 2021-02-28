export interface World {
  eight: number;
  width: number;
  orientation: Orientation;
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export type Orientation =  'N' | 'S' | 'E' | 'W' | '';
