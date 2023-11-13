import { createAction, props } from "@ngrx/store";
import { User } from "src/app/models/user.interface";



export const loadActiveUser = createAction(
    '[User] Load Active User',
    props<{ email: string }>()    
);

export const loadActiveUserSuccess = createAction(
  '[User] Load Active User Success',
  props<{ user: User }>()
);

export const loadActiveUserFailure = createAction(
  '[Users] Load Active User Failure',
  props<{ error: any }>()
);

//Updating UsersActive
export const updateActiveUser = createAction(
  '[Users] Update Users',
  props<{ id: number; content: User }>()
);

export const updateActiveUserSuccess = createAction(
  '[Users] Update Users Success',
  props<{ id: number; content: User  }>()
);

export const updateActiveUserFailure = createAction(
  '[Users] Update Users Failure',
  props<{ error: any }>()
);
