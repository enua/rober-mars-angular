export interface World {
  eight: number;
  width: number;
  orientation: 'N' | 'S' | 'E' | 'W' | '';
  location: Location;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export type Orientation =  'N' | 'S' | 'E' | 'W' | '';
