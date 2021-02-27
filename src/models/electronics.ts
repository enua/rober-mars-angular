import { Location } from "./places";

export interface Rover {
  name?: string;
  isAlive?: boolean;
  warnings: string[];
  position: Position;
}

export interface Position {
  pointer: 'N' | 'S' | 'E' | 'W' | '';
  coordinates: Location;
}
