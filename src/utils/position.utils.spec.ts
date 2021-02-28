
import { clone } from 'lodash';

import { Rover, Position } from '../models/electronics';
import { Location, World,  } from '../models/places';
import { amIOutsideSquare, getPointer, moveRoverForward, nextStepIsAvailable } from './position.utils';


describe('utils.position', () => {
  describe('moveRoverForward', () => {
    it('should return the moved position of rover', () => {
      const rover: Rover = {
        position: {
          pointer: 'N',
          coordinates: {
           latitude: 1,
           longitude: 1,
          },
         },
         warnings: [],
       };
      const expectedPosition: Position = {coordinates: {latitude: 2, longitude: 1}, pointer: 'N'};
      expect(moveRoverForward(rover.position)).toEqual(expectedPosition);
    });
  });

  describe('getPointer', () => {
    it('should return the moved orientation of rover', () => {
      const rover: Rover = {
       position: {
         pointer: 'N',
         coordinates: {
          latitude: 1,
          longitude: 1,
         },
        },
        warnings: [],
      };
      expect(getPointer(rover.position.pointer, 'L')).toBe('W');
      expect(getPointer(rover.position.pointer, 'R')).toBe('E');
    });
  });

  describe('amIOutsideSquare', () => {
    it('should return false if it is in the given square', () => {
      const inputLocation: World = {
        width: 10,
        height: 10,
        orientation: 'N',
        location: {
          latitude: 1,
          longitude: 1,
        }
      };
      const rover: Rover = {
       position: {
         pointer: 'N',
         coordinates: {
          latitude: 1,
          longitude: 1,
         },
        },
        warnings: [],
      };
      const roverCloned: Rover = clone(rover);
      expect(amIOutsideSquare(roverCloned, inputLocation)).toBe(false);
    });
    it('should return true if it is out the given square', () => {
      const inputLocation: World = {
        width: 10,
        height: 10,
        orientation: 'N',
        location: {
          latitude: 1,
          longitude: 1,
        }
      };
      const rover: Rover = {
       position: {
         pointer: 'N',
         coordinates: {
          latitude: 1,
          longitude: 1,
         },
        },
        warnings: [],
      };
      const roverCloned: Rover = clone(rover);
      roverCloned.position.coordinates.latitude = 14;
      expect(amIOutsideSquare(roverCloned, inputLocation)).toBe(true);
    });
  });

  describe('nextStepIsAvailable', () => {
    it('should return false only if next step is available', () => {
      const inputLocation: World = {
        width: 10,
        height: 10,
        orientation: 'N',
        location: {
          latitude: 1,
          longitude: 1,
        }
      };
      const rover: Rover = {
       position: {
         pointer: 'N',
         coordinates: {
          latitude: 1,
          longitude: 1,
         },
        },
        warnings: [],
      };
      expect(nextStepIsAvailable(rover, inputLocation)).toBe(true);
    });
    it('should return false when next step is not available', () => {
      const inputLocation: World = {
        width: 10,
        height: 10,
        orientation: 'N',
        location: {
          latitude: 1,
          longitude: 1,
        }
      };
      const rover: Rover = {
       position: {
         pointer: 'N',
         coordinates: {
          latitude: 1,
          longitude: 1,
         },
        },
        warnings: [],
      };
      const roverCloned: Rover = clone(rover);
      roverCloned.position.coordinates.latitude = 11;
      expect(nextStepIsAvailable(roverCloned, inputLocation)).toBe(false);
    });
    it('should return true when orientation limit is far away', () => {
      const inputLocation: World = {
        width: 10,
        height: 10,
        orientation: 'N',
        location: {
          latitude: 1,
          longitude: 1,
        }
      };
      const rover: Rover = {
       position: {
         pointer: 'N',
         coordinates: {
          latitude: 1,
          longitude: 1,
         },
        },
        warnings: [],
      };
      const roverCloned: Rover = clone(rover);
      roverCloned.position.coordinates.latitude = 3;
      roverCloned.position.pointer = 'S';
      expect(nextStepIsAvailable(roverCloned, inputLocation)).toBe(true);
    });
  });
});
