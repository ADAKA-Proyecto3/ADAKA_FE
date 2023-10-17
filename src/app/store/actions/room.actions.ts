import { createAction, props } from '@ngrx/store';
import { Room } from 'src/app/models/rooms.interface';

// Create room
export const addRoom = createAction(
  '[Room Page] Add Room',
  props<{ content: Room }>()
);

export const addRoomSuccess = createAction(
  '[Room Page] Add Room Success',
  props<{ content: Room }>()
);

export const addRoomFailure = createAction(
  '[Room Page] Add Room Failure',
  props<{ error: any }>()
);

//Updating rooms
export const updateRoom = createAction(
  '[Room Page] Update Room',
  props<{ id: number; content: Room }>()
);

export const updateRoomSucess = createAction(
  '[Room Page] Update Room Success',
  props<{ id: number; content: Room  }>()
);

export const updateRoomFailure = createAction(
  '[Room Page] Update Room Failure',
  props<{ error: any }>()
);

//Deleting room
export const removeRoom = createAction(
  '[Room Page] Remove Room',
  props<{ id: number }>()
);

export const removeRoomSuccess = createAction(
  '[Room Page] Remove Room Success',
  props<{ id: number }>()
);

export const removeRoomFailure = createAction(
  '[Room Page] Remove Room Failure',
  props<{ error: any }>()
);

//Loading rooms
export const loadRooms = createAction('[Room Page] Load Rooms');

export const loadRoomsSuccess = createAction(
  '[Rooms Page] Rooms Load Success',
  props<{ rooms: Room[] }>()
);

export const loadRoomsFailure = createAction(
  '[Rooms Page] Rooms Load Failure',
  props<{ error: any }>()
);
