import { Component } from '@angular/core';
import { isNaN } from 'lodash';
import { Rover } from '../models/electronics';
import { World, Location } from '../models/places';
import { moveRoverForward } from '../utils/utils';

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
    eight: 100,
    width: 100,
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
      }
    }
  }

  addOrientation(orientation: string): void {
  }

  orientation: 'N' | 'S' | 'E' | 'W' | '';

  command: string;

  checkCommand = (ev: KeyboardEvent): boolean => {
    // received: AALAARALA
    return this.validateRegex('myregex', this.command);
  }

  validateRegex(regex: string, text: string): boolean {
    return true; //TODO:
  }

  // TODO: click on form
  handleClick = () => {
    // TODO: CHECK LIST
    //1. world created?
    //2. location?
    //3. pointer? N, S...
    //4. command? ALRLAALR

    this.rover = {
      position: {
        pointer: this.rover.position.pointer ? this.rover.position.pointer : this.inputLocation.orientation,
        coordinates: {
          latitude: this.rover.position.coordinates.latitude ? this.rover.position.coordinates.latitude : this.inputLocation.location.latitude,
          longitude: this.rover.position.coordinates.longitude ? this.rover.position.coordinates.longitude : this.inputLocation.location.longitude,
        }
      }
    }
    //5. Move the rover
    this.moveRover(this.rover, this.command);
    //this.rover = beforeMoved(location, pointer Afer moved)
  }

  moveRover = (rover: Rover, command: string) => {
    if (this.validateRegex('asdasd', command) && this.command) {
      // check array letter
      const commandList: string[] = command.split('');
      commandList.forEach(item => {
        // change lat or long
        switch(item) {
          case 'A':
            // N+S -> Y(latitude) | E/W -> X(longitude)asdasdsa
            if (rover.position.pointer === 'N') {
              rover.position.coordinates.latitude =
              rover.position.coordinates.latitude + 1;
              console.log(moveRoverForward(rover.position.pointer, rover.position.coordinates));
              console.log('default', rover.position.coordinates)

              break;
            }

            if (rover.position.pointer === 'S') {
              rover.position.coordinates.latitude =
              rover.position.coordinates.latitude - 1;
              break;
            }

            if (rover.position.pointer === 'E') {
              rover.position.coordinates.longitude =
              rover.position.coordinates.longitude + 1;
              break;
            }

            if (rover.position.pointer === 'W') {
              rover.position.coordinates.longitude =
              rover.position.coordinates.longitude - 1;
              break;
            }

          case 'R':
            //  N+S -> X(longitude) | E/W -> Y(latitude)
            if (rover.position.pointer === 'N') {
              rover.position.coordinates.longitude =
              rover.position.coordinates.longitude + 1;
              rover.position.pointer = 'E';
              break;
            }

            if (rover.position.pointer === 'S') {
              rover.position.coordinates.longitude =
              rover.position.coordinates.longitude - 1;
              rover.position.pointer = 'W';
              break;
            }

            if (rover.position.pointer === 'E') {
              rover.position.coordinates.latitude =
              rover.position.coordinates.latitude + 1;
              rover.position.pointer = 'S';
              break;
            }

            if (rover.position.pointer === 'W') {
              rover.position.coordinates.latitude =
              rover.position.coordinates.latitude - 1;
              rover.position.pointer = 'N';
              break;
            }

          case 'L':
            //  N+S -> X(longitude) | E/W -> Y(latitude)
            if (rover.position.pointer === 'N') {
              rover.position.coordinates.longitude =
              rover.position.coordinates.longitude - 1;
              rover.position.pointer = 'W';
              break;
            }

            if (rover.position.pointer === 'S') {
              rover.position.coordinates.longitude =
              rover.position.coordinates.longitude + 1;
              rover.position.pointer = 'E';
              break;
            }

            if (rover.position.pointer === 'E') {
              rover.position.coordinates.latitude =
              rover.position.coordinates.latitude + 1;
              rover.position.pointer = 'N';
              break;
            }

            if (rover.position.pointer === 'W') {
              rover.position.coordinates.latitude =
              rover.position.coordinates.latitude - 1;
              rover.position.pointer = 'S';
              break;
            }
        }
      });
      console.log('moved?', rover.position.pointer, rover.position.coordinates)
    }
  }

  beforeMoved = (
    newLocation: Location,
    newPointer: 'N' | 'S' | 'E' | 'W' | '',
  ): Rover => {
    return {
      position: {
        pointer: newPointer,
        coordinates: {
          ... newLocation
        }
      }
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
