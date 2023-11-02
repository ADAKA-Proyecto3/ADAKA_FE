import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { DeviceState } from '../reducers/device.reducer';


export const selectDevices = (state: AppState) => state.device;

export const selectAlldevices = createSelector(
    selectDevices,
  (state: DeviceState) => state.Devices
);