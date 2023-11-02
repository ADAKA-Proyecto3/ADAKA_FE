import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from '../reducers/user.reducer';


export const selectRooms = (state: AppState) => state.users;

export const selectAllRooms = createSelector(
    selectRooms,
  (state: UserState) => state.users
);