import { createReducer, on } from '@ngrx/store';

import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { addRoomFailure, addRoomSuccess, loadRooms, loadRoomsFailure, loadRoomsSuccess, removeRoomFailure, removeRoomSuccess, updateRoomFailure, updateRoomSucess } from '../actions/room.actions';
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
  }))
);
