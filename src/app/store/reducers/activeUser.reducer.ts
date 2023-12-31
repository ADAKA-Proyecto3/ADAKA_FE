import { createReducer, on } from '@ngrx/store';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { User } from 'src/app/models/user.interface';
import {
  activeUserReset,
  loadActiveUser,
  loadActiveUserFailure,
  loadActiveUserSuccess,
  updateActiveUser,
  updateActiveUserFailure,
  updateActiveUserSuccess
} from '../actions/activeUser.actions';

export interface ActiveUserState {
  activeUser: User;
  error: any;
  status: ActionStatus;
}

export const initialState: ActiveUserState = {
  activeUser: {
    id: 0,
    name: '',
    email: '',
    phone: '',
    role: '',
  },
  error: '',
  status: ActionStatus.PENDING,
};

export const activeUserReducer = createReducer(
  initialState,

  on(loadActiveUser, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(loadActiveUserSuccess, (state, { user }) => ({
    ...state,
    activeUser: user,
    status: ActionStatus.SUCCESS,
  })),

  on(loadActiveUserFailure, (state, action) => ({
    ...state,
    error: action.error,
    status: ActionStatus.ERROR,
  })),

  on(updateActiveUserSuccess, (state, { content }) => ({
    ...state,
    activeUser: content,
    status: ActionStatus.SUCCESS,
    })),

  on(updateActiveUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(activeUserReset, () => initialState)
);
