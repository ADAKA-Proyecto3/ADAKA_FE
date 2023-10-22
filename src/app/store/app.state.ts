import { ActionReducerMap } from "@ngrx/store";
import { UserState, userReducer } from "./reducers/user.reducer";
import { RoomState, roomReducer } from "./reducers/room.reducer";
import { MedicalCenterState, medicalCenterReducer } from "./reducers/medicalCenter.reducer";


export interface AppState {
//Import all your reducers here
  users: UserState;
  rooms: RoomState;
  medicalCenters: MedicalCenterState;
}


export const appReducers: ActionReducerMap<AppState> = {
//Add all your reducers here
  users: userReducer,
  rooms: roomReducer,
  medicalCenters: medicalCenterReducer,
};
