import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Rover } from '../models/electronics';
import { Orientation, World } from '../models/places';
import { checkPositionInSquare, getPointer, moveRoverForward } from '../utils/position.utils';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  locationForm: FormGroup;

  // world
  eight: number = 15;
  width: number = 15;

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
  isInSquare: boolean = true;
  isInvalid: boolean = false;
  actualPosition: string[] = [];
  regeExp: string = '^[\s\dALR]+$';


  ngOnInit() {
    this.locationForm = new FormGroup({
      eight: new FormControl(10, Validators.required),
      width: new FormControl(10, Validators.required),
      command: new FormControl(null, [Validators.required, this.forbiddenCommands]),
      latitude: new FormControl(1, Validators.required),
      longitude: new FormControl(1, Validators.required),
      orientation: new FormControl('N', Validators.required),
    })
  }

  addOrientation(orientation: string): void {
  }

  checkCommand = (ev: KeyboardEvent): boolean => {
    return this.validateRegex(this.regeExp, this.command);
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
        eight: this.locationForm.get('eight').value as number,
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
    if (this.validateRegex('[ALR]', command) && this.command) {
      const commandList: string[] = command.split('');
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
        alert('Stop!')
        this.isInSquare = false;
      }
    } else {
      const today = new Date();
      rover.warnings.push(`Collision ALERT on: ${command} command, at: ${today}`)
    }
  }

  finished = (rover: Rover, isInSquare: boolean) => {
    this.emptyForm();
    this.actualPosition.push(
      `${isInSquare}, ${rover.position.pointer}, (${rover.position.coordinates.latitude},${rover.position.coordinates.longitude})`);
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

  // TODO: check for remove
  hideErrorForm() {
    setTimeout(()=>{
      this.isInvalid = false;
    }, 3000);
  }
}
