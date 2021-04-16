import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RoverPositionService } from '../../services/positionService';
import { WorldService } from '../../services/worldService';
import { Rover } from '../../models/electronics';
import { World } from '../../models/places';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  roverService: RoverPositionService;
  rover: Rover = {} as Rover;

  worldService: WorldService;
  world: World = {} as World;

  latitude: number[] = [];
  longitude: number[] = [];

  constructor(
    roverService: RoverPositionService,
    worldService: WorldService,
    ) {
    this.roverService = roverService;
    this.worldService = worldService;
  }

  ngOnInit(): void {
    this.roverService.roverPosition.subscribe((data) => this.rover = data);
    this.worldService.worldSize.subscribe((data) => {
      this.world = data;
      if(this.world.width > 0 && this.world.height > 0) {
        this.longitude = Array(this.world.width).fill(0).map((x, i)=> i);
        this.latitude = Array(this.world.height).fill(0).map((x, i)=> i);
      }
    });
  }

  amIonYou(lat: number, long: number): boolean {
    return this.rover.position.coordinates.latitude === lat &&
    this.rover.position.coordinates.longitude === long
  }

  getOrientation(): object {
    let border: string;
    switch(this.rover.position.pointer) {
      case 'N':
        border = 'top';
        break;
      case 'E':
        border = 'right';
        break;
      case 'S':
        border = 'bottom';
        break;
      case 'W':
        border = 'left';
        break;
    }

    return {[`border-${border}`]: '1px solid red'};
  }
}
