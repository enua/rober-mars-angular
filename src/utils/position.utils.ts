import { Position, Rover } from '../models/electronics';
import { Orientation, World, Location } from '../models/places';
export const moveRoverForward = (
  position: Position
  ): Position => {
    console.log('[[-'+position.pointer+']]')
    switch(position.pointer) {
      case 'N':
        position.coordinates.latitude = position.coordinates.latitude + 1
        break;
      case 'S':
        position.coordinates.latitude = position.coordinates.latitude - 1
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
      let pos: Orientation = '';
      pointers.forEach((item, index) =>{
        if(item === pointer && direction === 'L') {
          pos = index > 0 ? pointers[index-1] : pointers[pointers.length - 1];
        } else if(item === pointer && direction === 'R') {
          pos = (index + 1) < pointers.length ? pointers[index + 1] : pointers[0];
        }
      })
      return pos
  }

  export const amIOutsideSquare = (rover: Rover, inputLocation: World): boolean => {
    if (
      rover.position.coordinates.latitude >= inputLocation.width ||
      rover.position.coordinates.latitude <= 0 ||
      rover.position.coordinates.longitude >= inputLocation.eight ||
      rover.position.coordinates.latitude <= 0
      ) {
      return true;
    }
    return false;
  }
  export const nextStepIsAvailable = (location: Location, inputLocation: World): boolean => {
    if (
      (location.latitude <= inputLocation.eight ||
      location.latitude >= 0) &&
      (location.longitude >= 0 || location.longitude <= inputLocation.width)
      ) {
      return false;
    }
    return true;
  }

