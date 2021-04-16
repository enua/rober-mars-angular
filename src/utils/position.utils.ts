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
    switch (rover.position.pointer) {
      case 'N':
        return (rover.position.coordinates.latitude > 0)
      case 'W':
        return (rover.position.coordinates.longitude > 0)
      case 'S':
        return (rover.position.coordinates.latitude < inputLocation.height - 1)
      case 'E':
        return (rover.position.coordinates.longitude < inputLocation.width - 1)
      default:
        return false;
    }
  }

