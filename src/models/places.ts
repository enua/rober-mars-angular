export interface World {
  height: number;
  width: number;
  orientation: Orientation;
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export type Orientation =  'N' | 'S' | 'E' | 'W' | '';
export type Direction =  'L' | 'R';
export type Advance =  'A';
