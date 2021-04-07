import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rover } from '../models/electronics';
import { Orientation, World } from '../models/places';
import { RoverPositionService } from '../services/positionService';
import { amIOutsideSquare, getPointer, moveRoverForward, nextStepIsAvailable } from '../utils/position.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  locationForm: FormGroup;

  //roverService
  roverService: RoverPositionService;

  // world
  height = 15;
  width = 15;
  inputLocation: World;
  orientationList = [
    {name: 'Nord',  value: 'N'},
    {name: 'South', value: 'S'},
    {name: 'East',  value: 'E'},
    {name: 'West',  value: 'W'},
  ]

  // init rover values
   rover: Rover = {
    position: {
      pointer: '',
      coordinates: {
        latitude: NaN,
        longitude: NaN,
      },
    },
    warnings: []
  }

  orientation: Orientation;
  command: string = '';
  isInSquare = true;
  isInvalid = false;
  actualPosition: string[] = [];
  regeExp = '^[\s\dALR]+$';

  constructor(roverService: RoverPositionService) {
    this.roverService = roverService;
  }

  ngOnInit() {
    this.locationForm = new FormGroup({
      height: new FormControl(10, Validators.required),
      width: new FormControl(10, Validators.required),
      command: new FormControl('ALLL', [Validators.required, this.forbiddenCommands]),
      latitude: new FormControl(5, Validators.required),
      longitude: new FormControl(5, Validators.required),
      orientation: new FormControl('N', Validators.required),
    })
  }

  validateRegex(regex: string, text: string): boolean {
    const regexp = new RegExp(regex);
    const check = regexp.test(text);
    return check;
  }

  forbiddenCommands = (control: FormControl): {[s: string]: boolean} => {
    if (!this.validateRegex(this.regeExp, control.value)) {
      return { 'regeExpisForbidden': true };
    }

    return null;
  }



  handleClick = () => {
    if(this.locationForm.valid) {

      this.inputLocation = {
        height: this.locationForm.get('height').value as number,
        width: this.locationForm.get('width').value as number,
        orientation: this.locationForm.get('orientation').value as Orientation,
        location: {
          latitude: this.locationForm.get('latitude').value as number,
          longitude: this.locationForm.get('longitude').value as number,
        }
      };

      this.command = this.locationForm.get('command').value as string;

      this.rover = {
        position: {
          pointer: this.rover?.position.pointer ? this.rover.position.pointer : this.inputLocation.orientation,
          coordinates: {
            latitude: this.rover?.position.coordinates.latitude ? this.rover.position.coordinates.latitude : this.inputLocation.location.latitude,
            longitude: this.rover?.position.coordinates.longitude ? this.rover.position.coordinates.longitude : this.inputLocation.location.longitude,
          }
        },
        warnings: [...this.rover?.warnings],
      }

      //5. Move the rover
      this.moveRover(this.rover, this.command);

      this.finished(this.rover, this.isInSquare);
    }
  }

  moveRover = (rover: Rover, command: string) => {
    this.roverService.setRoverPosition(rover);
    if (this.validateRegex('[ALR]', command) && this.command) {
      const commandList: string[] = command.split('');
      try {
        commandList.forEach(item => {
          switch(item) {
            case 'A':
              !amIOutsideSquare(this.rover, this.inputLocation)
              ?
              (nextStepIsAvailable(this.rover, this.inputLocation, ) ?
              rover.position = moveRoverForward(rover.position) :
              rover.warnings.push(`WARNING LIMIT on: [${command}] command, at: ${new Date()}`)
              )
              : rover.position = rover.position;
              break;
            default:
              rover.position.pointer = getPointer(rover.position.pointer, item);
              break;
          }

          if (amIOutsideSquare(this.rover, this.inputLocation)) {
            rover.warnings.push(`Crashed :( on: [${command}] command, at: ${new Date()}`)
            throw new Error('Rover, dare might things!');
          }
        });

      } catch (error) {
        console.log(error);
        this.isInSquare = amIOutsideSquare(this.rover, this.inputLocation);
      }
    } else {
      const today = new Date();
      rover.warnings.push(`Collision ALERT on: ${command} command, at: ${today}`)
    }
  }

  finished = (rover: Rover, isInSquare: boolean) => {
    this.emptyForm();
    this.actualPosition.push(
      `${this.locationForm.valid}, ${rover.position.pointer}, (${rover.position.coordinates.latitude},${rover.position.coordinates.longitude})`);
  }

  emptyForm(): void{
    this.inputLocation = {
      height: this.inputLocation.height,
      width: this.inputLocation.height,
      orientation: '',
      location: {
        latitude: this.rover.position.coordinates.latitude,
        longitude: this.rover.position.coordinates.longitude,
      }
    };
    this.command = '';
  };
}
