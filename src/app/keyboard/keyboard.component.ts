import { Component, OnInit } from '@angular/core';
import { Rover } from '../../models/electronics';
import { Orientation, World } from '../../models/places';
import { RoverPositionService } from '../../services/positionService';
import { WorldService } from '../../services/worldService';
import { getPointer, moveRoverForward, nextStepIsAvailable } from '../../utils/position.utils';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit{
  rover: Rover = {} as Rover;
  world: World = {} as World;

  //roverService
  roverService: RoverPositionService;
  worldService: WorldService;

  constructor(
    roverService: RoverPositionService,
    worldService: WorldService,
    ) {
    this.roverService = roverService;
    this.worldService = worldService;
  }

  ngOnInit(): void {
    this.roverService.roverPosition.subscribe((data) => this.rover = data);
    this.worldService.worldSize.subscribe((data) => this.world = data);
  }

  handleMoveForward(): void {
    if (!nextStepIsAvailable(this.rover, this.world)) return;
    this.roverService.setRoverPosition({position: moveRoverForward(this.rover.position), ...this.rover})
  }

  handleChangePointer(direction: string): void { //L, R
    this.rover.position.pointer = getPointer(this.rover.position.pointer, direction);
    this.roverService.setRoverPosition(this.rover);
  }

}
