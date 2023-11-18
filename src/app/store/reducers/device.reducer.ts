import { createReducer, on } from '@ngrx/store';
import {
  loadDevicesFailure,
  loadDevices,
  loadDevicesSuccess,
  addDeviceFailure,
  addDeviceSuccess,
  addDevice,
  removeDevice,
  removeDeviceSuccess,
  removeDeviceFailure,
} from '../actions/device.actions';
import { Device } from 'src/app/models/devices.interface';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';

export interface DeviceState {
  devices: Device[];
  error: any;
  status: ActionStatus;
}

export const initialState: DeviceState = {
  devices: [],
  error: '',
  status: ActionStatus.PENDING,
};

export const deviceReducer = createReducer(
  initialState,

  on(addDevice, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(addDeviceSuccess, (state, { content }) => ({
    ...state,
    devices: [...state.devices, content],
    status: ActionStatus.SUCCESS,
  })),

  on(addDeviceFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(removeDevice, (state)=>({
    ...state,
    status: ActionStatus.LOADING,
  })),


  on(removeDeviceSuccess, (state, { deviceId }) => ({
    
    ...state,
    devices: state.devices.filter((devices) => devices.id !== deviceId),
    status: ActionStatus.SUCCESS,
  })),

  on(removeDeviceFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(loadDevices, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(loadDevicesSuccess, (state, { devices }) => ({
    ...state,
    devices: devices,
    status: ActionStatus.SUCCESS,
  })),

  on(loadDevicesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: ActionStatus.ERROR,
  }))
);
