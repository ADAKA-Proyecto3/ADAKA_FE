import { ActionReducerMap } from "@ngrx/store";
import { UserState, userReducer } from "./reducers/user.reducer";
import { RoomState, roomReducer } from "./reducers/room.reducer";
import { DeviceState, deviceReducer } from "./reducers/device.reducer";


export interface AppState {
//Import all your reducers here
  users: UserState;
  rooms: RoomState;
  devices: DeviceState;
}


export const appReducers: ActionReducerMap<AppState> = {
  //Add all your reducers here
  users: userReducer,
  rooms: roomReducer,
  devices: deviceReducer
};