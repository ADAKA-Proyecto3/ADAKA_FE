import { createAction, props } from '@ngrx/store';
import { Device } from 'src/app/models/devices.interface';

// Create device
export const addDevice = createAction(
  '[Device Page] Add Device',
  props<{ content: Device }>()
);

export const addDeviceSuccess = createAction(
  '[Device Page] Add Device Success',
  props<{ content: Device }>()
);

export const addDeviceFailure = createAction(
  '[Device Page] Add Device Failure',
  props<{ error: any }>()
);

//Updating device
export const updateDevice = createAction(
  '[Device Page] Update Device',
  props<{ id: number; content: Device }>()
);

export const updateDeviceSuccess = createAction(
  '[device Page] Update Device Success',
  props<{ id: number; content: Device  }>()
);

export const updateDeviceFailure = createAction(
  '[device Page] Update device Failure',
  props<{ error: any }>()
);

//Deleting device
export const removeDevice = createAction(
  '[device Page] Remove device',
  props<{ id: number }>()
);

export const removeDeviceSuccess = createAction(
  '[device Page] Remove device Success',
  props<{ id: number }>()
);

export const removeDeviceFailure = createAction(
  '[device Page] Remove device Failure',
  props<{ error: any }>()
);

//Loading devices
export const loadDevices = createAction(
  '[device Page] Load devices',
  props<{ id: number }>()
);

export const loadDevicesSuccess = createAction(
  '[devices Page] devices Load Success',
  props<{ devices: Device[] }>()
);

export const loadDevicesFailure = createAction(
  '[devices Page] devices Load Failure',
  props<{ error: any }>()
);
