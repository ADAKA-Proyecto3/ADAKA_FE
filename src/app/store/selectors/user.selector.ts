import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from '../reducers/user.reducer';


export const selectUsers = (state: AppState) => state.users;

export const selectUserState = (state: AppState) => state.users;

export const selectAllUsers = createSelector(
    selectUsers,
  (state: UserState) => state.users
);

export const selectUserStatus = createSelector(
  selectUserState,
  (state: UserState) => state.status
);