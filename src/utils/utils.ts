import { Position, Rover } from '../models/electronics';
import { World } from '../models/places';
export const moveRoverForward = (
  position: Position //TODO: TYped in places.orientation?
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
      pointer: 'N' | 'S' | 'E' | 'W' | '',
      direction: string,
    ): ('N' | 'S' | 'E' | 'W' | '') => {
      const pointers: ('N' | 'S' | 'E' | 'W' | '')[] = ['W', 'N', 'E', 'S'];
      let pos: 'N' | 'S' | 'E' | 'W' | '' = '';
      pointers.forEach((item, index) =>{
        if(item === pointer && direction === 'L') {
          console.log('LEFT')
          pos = index > 0 ? pointers[index-1] : pointers[pointers.length - 1];
          if (index > 0) console.log(pointers[index], pointers[pointers.length])
          console.log('test', pos)

        } else if(item === pointer && direction === 'R') {
          console.log('RIGHT')
          pos = index < pointers.length ? pointers[index + 1] : pointers[0];
        }
      })
      console.log(pos)
      return pos
  }

  export const checkPositionInSquare = (rover: Rover, inputLocation: World): boolean => {
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

  // TODO: RENAME to positions.utils.ts
  // validations.utils.ts
