import { createReducer, on } from '@ngrx/store';

import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import {
  addRoom,
  addRoomFailure,
  addRoomSuccess,
  loadRooms,
  loadRoomsFailure,
  loadRoomsSuccess,
  removeRoom,
  removeRoomFailure,
  removeRoomSuccess,
  updateAddRoomDevice,
  updateAddRoomDeviceFailure,
  updateAddRoomDeviceSucess,
  updateRoom,
  updateRoomFailure,
  updateRoomSucess,
} from '../actions/room.actions';
import { Room } from 'src/app/models/rooms.interface';

export interface RoomState {
  rooms: Room[];
  error: any;
  status: ActionStatus;
}

export const initialState: RoomState = {
  rooms: [],
  error: '',
  status: ActionStatus.PENDING,
};

export const roomReducer = createReducer(
  initialState,

  on(addRoom, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(addRoomSuccess, (state, { content }) => ({
    ...state,
    rooms: [...state.rooms, content],
    status: ActionStatus.SUCCESS,
  })),

  on(addRoomFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(updateAddRoomDevice, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(updateAddRoomDeviceSucess, (state, { content }) => ({
    ...state,
    rooms: state.rooms.map((room) => {
      if (room.id === content.id) {
        return {
          ...room,
          ...content,
        };
      }
      return room;
    }),
    status: ActionStatus.SUCCESS,
  })),

  on(updateAddRoomDeviceFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(updateRoom, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(updateRoomSucess, (state, { id, content }) => ({
    ...state,
    rooms: state.rooms.map((room) => {
      if (room.id === id) {
        return {
          ...room,
          ...content,
        };
      }
      return room;
    }),
  })),

  on(updateRoomFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),


  on(removeRoom, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(removeRoomSuccess, (state, { id }) => ({
    ...state,
    rooms: state.rooms.filter((rooms) => rooms.id !== id),
    status: ActionStatus.SUCCESS,
  })),

  on(removeRoomFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(loadRooms, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(loadRoomsSuccess, (state, { rooms }) => ({
    ...state,
    rooms: rooms,
    status: ActionStatus.SUCCESS,
  })),

  on(loadRoomsFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: ActionStatus.ERROR,
  })),

  // on(loadRoomsByMedicalCenter, (state) => ({
  //   ...state,
  //   status: ActionStatus.LOADING,
  // })),

  // on(loadRoomsByMedicalCenterSuccess, (state, { rooms }) => ({
  //   ...state,
  //   rooms: rooms,
  //   status: ActionStatus.SUCCESS,
  // })),

  // on(loadRoomsByMedicalCenterFailure, (state, { error }) => ({
  //   ...state,
  //   error: error,
  //   status: ActionStatus.ERROR,
  // }))
);
