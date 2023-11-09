import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from '../reducers/user.reducer';
import { RoomState } from '../reducers/room.reducer';


export const selectRooms = (state: AppState) => state.users;

export const selectAllRooms = createSelector(
    selectRooms,
  (state: UserState) => state.users
);


export const selectRoomState = (state: AppState) => state.rooms;
export const selectRoomStatus = createSelector(
  selectRoomState,
  (state: RoomState) => state.status
);