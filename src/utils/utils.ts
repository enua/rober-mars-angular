import { Location } from '../models/places';
export const moveRoverForward = (
  pointer: 'N' | 'S' | 'E' | 'W' | '',
  location: Location,
  ): Location => {
    if (pointer === '') return location;
    pointer === 'N' || 'S' ?
      (pointer === 'N' ?
        location.latitude = location.latitude + 1 :
        location.latitude = location.latitude - 1
      ) :
        (pointer === 'E' ?
        location.longitude = location.longitude + 1 :
        location.longitude = location.longitude -1)

  return location;
}
