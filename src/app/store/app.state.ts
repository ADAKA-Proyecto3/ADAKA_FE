import { ActionReducerMap } from "@ngrx/store";
import { UserState, userReducer } from "./reducers/user.reducer";


export interface AppState {
//Import all your reducers here
  users: UserState;
}


export const appReducers: ActionReducerMap<AppState> = {
//Add all your reducers here
  users: userReducer,

};