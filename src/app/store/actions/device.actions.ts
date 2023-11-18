import { createAction, props } from '@ngrx/store';
import { Device } from 'src/app/models/devices.interface';

// Create device
export const addDevice = createAction(
  '[Device Page] Add Device',
  props<{ adminId: number, content: Device }>()
);

export const addDeviceSuccess = createAction(
  '[Device Page] Add Device Success',
  props<{ content: Device }>()
);

export const addDeviceFailure = createAction(
  '[Device Page] Add Device Failure',
  props<{ error: any }>()
);

//Deleting device
export const removeDevice = createAction(
  '[Device Page] Remove device',
  props<{ deviceId: number }>()
);

export const removeDeviceSuccess = createAction(
  '[Device Page] Remove device Success',
  props<{ deviceId: number }>()
);

export const removeDeviceFailure = createAction(
  '[Device Page] Remove device Failure',
  props<{ error: any }>()
);

//Loading devices
export const loadDevices = createAction(
  '[Device Page] Load devices',
  props<{ adminId: number }>()
);

export const loadDevicesSuccess = createAction(
  '[Devices Page] devices Load Success',
  props<{ devices: Device[] }>()
);

export const loadDevicesFailure = createAction(
  '[Devices Page] devices Load Failure',
  props<{ error: any }>()
);
