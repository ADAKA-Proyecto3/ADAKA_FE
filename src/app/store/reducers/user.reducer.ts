import { createReducer, on } from '@ngrx/store';
import {
  removeUserSuccess,
  removeUserFailure,
  loadUsersFailure,
  loadUsers,
  loadUsersSuccess,
  updateUserSucess,
  updateUserFailure,
  addSubUserFailure,
  addSubUserSuccess,
  removeUser,
  updateUser,
  addSubUser,
} from '../actions/user.actions';
import { User } from 'src/app/models/user.interface';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';

export interface UserState {
  users: User[];
  error: any;
  status: ActionStatus;
}

export const initialState: UserState = {
  users: [],
  error: '',
  status: ActionStatus.PENDING,
};

export const userReducer = createReducer(
  initialState,


  on(addSubUser, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(addSubUserSuccess, (state, { content }) => ({
    ...state,
    users: [...state.users, content],
    status: ActionStatus.SUCCESS,
  })),

  on(addSubUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(updateUser, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(updateUserSucess, (state, { id, content }) => ({
    ...state,
    status: ActionStatus.SUCCESS,
    users: state.users.map((user) => {
      if (user.id === id) {
        return {
          ...user,
          ...content,
        };
      }
      return user;
    }),
  })),

  on(updateUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(removeUser, (state)=>({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(removeUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((users) => users.id !== id),
    status: ActionStatus.SUCCESS,
  })),

  on(removeUserFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(loadUsers, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users: users,
    status: ActionStatus.SUCCESS,
  })),

  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: ActionStatus.ERROR,
  }))
);
