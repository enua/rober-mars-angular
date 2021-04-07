import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Rover } from "../models/electronics";

@Injectable()
export class RoverPositionService {
  private rover$  = new BehaviorSubject<Rover>({} as Rover);
  rover = this.rover$.asObservable();

  get roverPosition(): Observable<Rover> {
    return this.rover$.asObservable();
  }

  setRoverPosition(rover: Rover) {
    this.rover$.next(rover);
  }
}
