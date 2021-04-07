import { Component, OnInit } from '@angular/core';
import { Rover } from '../../models/electronics';
import { RoverPositionService } from '../../services/positionService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  rover: Rover = {} as Rover;
  roverService: RoverPositionService;

  constructor(roverService: RoverPositionService) {
    this.roverService = roverService;
  }

  ngOnInit(): void {
    this.roverService.roverPosition.subscribe((data) => this.rover = data);
  }
}
