import { Component } from '@angular/core';
import { isNil } from 'lodash';
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
  eight: number = 15;
  width: number = 15;

  inputLocation: World = {
    eight: this.eight,
    width: this.width,
    orientation: 'N',
    location: {
      latitude: 7,
      longitude: 7,
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
  command: string = 'AALAALAALAAL';
  isInSquare: boolean = true;
  isInvalid: boolean = false;
  actualPosition: string[] = [];

  addOrientation(orientation: string): void {
  }

  checkCommand = (ev: KeyboardEvent): boolean => {
    return this.validateRegex('[ALR]', this.command);
  }

  validateRegex(regex: string, text: string): boolean {
    const regexp = new RegExp(regex);
    const check = regexp.test(text);
    return check; //TODO:
  }

  handleClick = () => {
    // TODO: VALIDATIONS

    if(
      isNil(this.inputLocation.eight) ||
      isNil(this.inputLocation.width) ||
      this.command === '' ||
      isNil(this.inputLocation.location.latitude) ||
      isNil(this.inputLocation.location.longitude) ||
      isNil(this.inputLocation.orientation)
      ){
        this.isInvalid = true;
        this.hideErrorForm();
        return;
      }

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

    this.finished(this.rover, this.isInSquare);
  }

  moveRover = (rover: Rover, command: string) => {
    if (this.validateRegex('[ALR]', command) && this.command) {
      const commandList: string[] = command.split('');
      console.log(commandList)
      try {
        commandList.forEach(item => {

          switch(item) {
            case 'A':
              checkPositionInSquare(rover, this.inputLocation)
              ? rover.position = rover.position
              : rover.position = moveRoverForward(rover.position);
              break;
            default:
              checkPositionInSquare(rover, this.inputLocation)
              ? rover.position.pointer = rover.position.pointer
              : rover.position.pointer = getPointer(rover.position.pointer, item);
              break;
          }

          if (checkPositionInSquare(rover, this.inputLocation)) {
            rover.warnings.push(`(${rover.position.coordinates.longitude}, ${rover.position.coordinates.latitude}) <--- Failed to execute on ${new Date()}`)
            throw new Error('Rover, dare might things!');
          }
        });

      } catch (error) {
        console.log(error);
        this.isInSquare = false;
      }
    } else {
      const today = new Date();
      rover.warnings.push(`Collision ALERT on: ${command} command, at: ${today}`)
    }
  }

  // TODO:
  finished = (rover: Rover, isInSquare: boolean) => {
    this.emptyForm();
    this.actualPosition.push(
      `${isInSquare}, ${rover.position.pointer}, (${rover.position.coordinates.latitude},${rover.position.coordinates.longitude})`);//'True, N, (4,5)' // TODO:
  }

  emptyForm(): void{
    this.inputLocation = {
      eight: this.inputLocation.eight,
      width: this.inputLocation.eight,
      orientation: '',
      location: {
        latitude: this.rover.position.coordinates.latitude,
        longitude: this.rover.position.coordinates.longitude,
      }
    };
    this.command = '';
  };

  hideErrorForm() {
    setTimeout(()=>{
      this.isInvalid = false;
    }, 3000);
  }
}
