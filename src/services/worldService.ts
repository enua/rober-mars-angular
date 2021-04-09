import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { World } from "../models/places";

@Injectable()
export class WorldService {
  private world$  = new BehaviorSubject<World>({} as World);
  world = this.world$.asObservable();

  get worldSize(): Observable<World> {
    return this.world$.asObservable();
  }

  setWorldSize(world: World) {
    this.world$.next(world);
  }
}
