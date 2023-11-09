import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { DeviceState } from '../reducers/device.reducer';


export const selectDevices = (state: AppState) => state.devices;
export const selectDeviceState = (state: AppState) => state.devices;

export const selectAlldevices = createSelector(
    selectDevices,
  (state: DeviceState) => state.devices
);

export const selectDeviceStatus = createSelector(
  selectDeviceState,
  (state: DeviceState) => state.status
);