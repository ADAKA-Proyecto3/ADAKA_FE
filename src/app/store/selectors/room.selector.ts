import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { RoomState } from '../reducers/room.reducer';


export const selectRooms = (state: AppState) => state.rooms;
export const selectRoomsState= (state: AppState) => state.rooms;

export const selectAllRooms = createSelector(
    selectRooms,
  (state: RoomState) => state.rooms
);

export const roomStatusAndError = createSelector(
  selectRoomsState,
  (state: RoomState) => ({
    status: state.status,
    error: state.error
  })
);