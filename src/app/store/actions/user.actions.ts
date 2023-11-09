import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.interface';

export const addSubUser = createAction(
  '[User Page] Add User',
  props<{ content: User, parentId:number, medicalCenterId:number }>()
);

export const addSubUserSuccess = createAction(
  '[User Page] Add User Success',
  props<{ content: User }>()
);

export const addSubUserFailure = createAction(
  '[User Page] Add User Failure',
  props<{ error: any }>()
);

//Updating user
export const updateUser = createAction(
  '[User Page] Update User',
  props<{ id: number; content: User }>()
);

export const updateUserSucess = createAction(
  '[User Page] Update User Success',
  props<{ id: number; content: User  }>()
);

export const updateUserFailure = createAction(
  '[User Page] Update User Failure',
  props<{ error: any }>()
);

//Deleting user
export const removeUser = createAction(
  '[User Page] Remove User',
  props<{ id: number }>()
);

export const removeUserSuccess = createAction(
  '[User Page] Remove User Success',
  props<{ id: number }>()
);

export const removeUserFailure = createAction(
  '[User Page] Remove User Failure',
  props<{ error: any }>()
);

//Loading users
export const loadUsers = createAction(
  '[User Page] Load Users',
  props<{ id: number }>()
  );

export const loadUsersSuccess = createAction(
  '[Users API] Users Load Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users API] Users Load Failure',
  props<{ error: any }>()
);
