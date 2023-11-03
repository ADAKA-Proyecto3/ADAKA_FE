import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActiveUserState } from '../reducers/activeUser.reducer';

export const selectActiveUser = (state: AppState) => state.user;


export const selectSignInUser = createSelector(
    selectActiveUser,
  (state: ActiveUserState) => state.activeUser
);

