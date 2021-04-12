import { Position, Rover } from '../models/electronics';
import { Orientation, World, Location } from '../models/places';
export const moveRoverForward = (
  position: Position
  ): Position => {
    switch(position.pointer) {
      case 'N':
        position.coordinates.latitude = position.coordinates.latitude - 1
        break;
      case 'S':
        position.coordinates.latitude = position.coordinates.latitude + 1
        break;
      case 'E':
        position.coordinates.longitude = position.coordinates.longitude + 1
        break;
      case 'W':
        position.coordinates.longitude = position.coordinates.longitude - 1
        break;
    }

  return position;
}

  export const getPointer = (
      pointer: Orientation,
      direction: string,
    ): Orientation => {
      const pointers: Orientation[] = ['W', 'N', 'E', 'S'];
      let position: Orientation = '';
      pointers.forEach((item, index) =>{
        if(item === pointer && direction === 'L') {
          position = index > 0 ? pointers[index-1] : pointers[pointers.length - 1];
        } else if(item === pointer && direction === 'R') {
          position = (index + 1) < pointers.length ? pointers[index + 1] : pointers[0];
        }
      });

      return position;
  }

  export const amIOutsideSquare = (rover: Rover, inputLocation: World): boolean => {
    if (
      rover.position.coordinates.latitude > inputLocation.height ||
      rover.position.coordinates.latitude < 0 ||
      rover.position.coordinates.longitude > inputLocation.width ||
      rover.position.coordinates.latitude < 0
      ) {

      return true;
    }

    return false;
  }
  export const nextStepIsAvailable = (rover: Rover, inputLocation: World): boolean => {
    console.log(rover.position.coordinates.latitude, inputLocation.height);
    switch (rover.position.pointer) {
      case 'N':
        if (rover.position.coordinates.latitude - 1 === 0) return false;
        break;
      case 'S':
        if (rover.position.coordinates.latitude + 2 === inputLocation.height) return false;
        break;
      case 'E':
        if (rover.position.coordinates.longitude + 2 >= inputLocation.width) return false;
        break;
      case 'W':
        if (rover.position.coordinates.longitude - 1 === 0) return false;
        break;
    }

    return true;
  }

