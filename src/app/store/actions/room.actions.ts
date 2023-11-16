import { createAction, props } from '@ngrx/store';
import { Room } from 'src/app/models/rooms.interface';

// Create room
export const addRoom = createAction(
  '[Room Page] Add Room',
  props<{ id: number; content: Room }>()
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
  props<{ id: number; medicalCenterId:number ;content: Room }>()
);

export const updateRoomSucess = createAction(
  '[Room Page] Update Room Success',
  props<{ id: number; content: Room  }>()
);

export const updateRoomFailure = createAction(
  '[Room Page] Update Room Failure',
  props<{ error: any }>()
);

export const updateAddRoomDevice = createAction(
  '[Room Page] Update Add Room Device',
  props<{ roomId: number; deviceId:number }>()
);

export const updateAddRoomDeviceSucess = createAction(
  '[Room Page] Update Add Room Device Success',
  props<{ roomId: number; content:Room }>()
);

export const updateAddRoomDeviceFailure = createAction(
  '[Room Page] Update Add Room Device Failure',
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
export const loadRooms = createAction(
  '[Room Page] Load Rooms',
  props<{ id: number }>()
);

export const loadRoomsSuccess = createAction(
  '[Rooms Page] Rooms Load Success',
  props<{ rooms: Room[] }>()
);

export const loadRoomsFailure = createAction(
  '[Rooms Page] Rooms Load Failure',
  props<{ error: any }>()
);















export const loadRoomsByMedicalCenter = createAction(
  '[Room Page] Load Rooms ByMedicalCenter',
  props<{ id: number }>()
);

export const loadRoomsByMedicalCenterSuccess = createAction(
  '[Rooms Page] Rooms Load ByMedicalCenter Success',
  props<{ rooms: Room[] }>()
);

export const loadRoomsByMedicalCenterFailure = createAction(
  '[Rooms Page] Rooms Load  ByMedicalCenter Failure',
  props<{ error: any }>()
);
