import { ActionReducerMap } from "@ngrx/store";
import { UserState, userReducer } from "./reducers/user.reducer";
import { RoomState, roomReducer } from "./reducers/room.reducer";
import { DeviceState, deviceReducer } from "./reducers/device.reducer";
import { MedicalCenterState, medicalCenterReducer } from "./reducers/medicalCenter.reducer";
import { ActiveUserState, activeUserReducer } from "./reducers/activeUser.reducer";
export interface AppState {
[x: string]: any;
//Import all your reducers here
  users: UserState;
  rooms: RoomState;
  devices: DeviceState;
  medicalCenters: MedicalCenterState;
  user: ActiveUserState;

}


export const appReducers: ActionReducerMap<AppState> = {
  //Add all your reducers here
  users: userReducer,
  rooms: roomReducer,
  devices: deviceReducer,
  medicalCenters: medicalCenterReducer,
  user: activeUserReducer,

};

