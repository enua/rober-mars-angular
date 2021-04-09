import { Component, OnInit } from '@angular/core';
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
        this.longitude = Array(this.world.width + 1).fill(0).map((x, i)=> i);
        this.latitude = Array(this.world.height + 1).fill(0).map((x, i)=> i);
      }
    });
  }
}
