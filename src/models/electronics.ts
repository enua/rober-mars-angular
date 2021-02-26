import { Location } from "./places";

export interface Rover {
  name?: string;
  isAlive?: boolean;
  position: Position;
}

interface Position {
  pointer: 'N' | 'S' | 'E' | 'W' | '';
  coordinates: Location;
}

