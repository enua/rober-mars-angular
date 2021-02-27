import { Component } from '@angular/core';
import { Rover } from '../models/electronics';
import { World, Location } from '../models/places';
import { checkPositionInSquare, getPointer, moveRoverForward } from '../utils/position.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // world
  eight: number = 100;
  width: number = 100;

  inputLocation: World = {
    eight: this.eight,
    width: this.width,
    orientation: '',
    location: {
      latitude: NaN,
      longitude: NaN,
    }
  };

  orientationList = [
    {name: 'Nord',  value: 'N'},
    {name: 'South', value: 'S'},
    {name: 'East',  value: 'E'},
    {name: 'West',  value: 'W'},
  ]

  // init rover values
  rover: Rover = {
    position: {
      pointer: this.inputLocation.orientation !== '' ? this.inputLocation.orientation : '',
      coordinates: {
        latitude: this.inputLocation.location.latitude ? this.inputLocation.location.latitude : NaN,
        longitude: this.inputLocation.location.longitude ? this.inputLocation.location.longitude : NaN,
      },
    },
    warnings: []
  }

  orientation: 'N' | 'S' | 'E' | 'W' | '';
  command: string = '';
  isInSquare: boolean = true;

  addOrientation(orientation: string): void {
  }

  checkCommand = (ev: KeyboardEvent): boolean => {
    // received: AALAARALA
    return this.validateRegex('[ALR]', this.command);
  }

  validateRegex(regex: string, text: string): boolean {
    const regexp = new RegExp(regex);
    const check = regexp.test(text);
    return check; //TODO:
  }

  handleClick = () => {
    // TODO: VALIDATIONS

    this.rover = {
      position: {
        pointer: this.rover.position.pointer ? this.rover.position.pointer : this.inputLocation.orientation,
        coordinates: {
          latitude: this.rover.position.coordinates.latitude ? this.rover.position.coordinates.latitude : this.inputLocation.location.latitude,
          longitude: this.rover.position.coordinates.longitude ? this.rover.position.coordinates.longitude : this.inputLocation.location.longitude,
        }
      },
      warnings: [...this.rover.warnings],
    }
    //5. Move the rover

    this.moveRover(this.rover, this.command);

    //7. finished()
  }

  moveRover = (rover: Rover, command: string) => {
    console.log('COMMAND ?');
    if (this.validateRegex('[ALR]', command) && this.command) {
      // check array letter
      const commandList: string[] = command.split('');
      console.log(commandList)
      try {
        commandList.forEach(item => {

          switch(item) {
            case 'A':
              rover.position = moveRoverForward(rover.position);
              break;
            default:
              rover.position.pointer = getPointer(rover.position.pointer, item);
              break;
          }

          // 6. Check if the rover should stop moving
          if (checkPositionInSquare(rover, this.inputLocation)) {
            rover.warnings.push(`(${rover.position.coordinates.longitude},(${rover.position.coordinates.latitude}) <--- Failed to execute on ${new Date()}`)
            throw new Error('Rover, you are going too far!');
          }
        });

      } catch (error) {
        console.log(error);
        this.isInSquare = false;
      }
    } else {
      rover.warnings.push(`UnAuthorized command ${command} <--- Failed to execute on ${new Date()}`)
    }
  }

  allSettingsGo = (): boolean => {
    // TODO: can we move rover?
    return false;
  }

  // TODO:
  finished = (): string => {
    return 'True, N, (4,5)' // TODO:
  }
}
