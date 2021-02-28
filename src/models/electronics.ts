import { Location, Orientation } from "./places";

export interface Rover {
  name?: string;
  isAlive?: boolean;
  warnings: string[];
  position: Position;
}

export interface Position {
  pointer: Orientation;
  coordinates: Location;
}
