import { createReducer, on } from '@ngrx/store';
import {
  removeDeviceSuccess,
  removeDeviceFailure,
  loadDevicesFailure,
  loadDevices,
  loadDevicesSuccess,
  updateDeviceSuccess,
  updateDeviceFailure,
  addDeviceFailure,
  addDeviceSuccess,
} from '../actions/device.actions';
import { Device } from 'src/app/models/devices.interface';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';

export interface DeviceState {
  Devices: Device[];
  error: any;
  status: ActionStatus;
}

export const initialState: DeviceState = {
  Devices: [],
  error: '',
  status: ActionStatus.PENDING,
};

export const deviceReducer = createReducer(
  initialState,

  on(addDeviceSuccess, (state, { content }) => ({
    ...state,
    Devices: [...state.Devices, content],
    status: ActionStatus.SUCCESS,
  })),

  on(addDeviceFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(updateDeviceSuccess, (state, { id, content }) => ({
    ...state,
    Devices: state.Devices.map((Device) => {
      if (Device.id === id) {
        return {
          ...Device,
          ...content,
        };
      }
      return Device;
    }),
  })),

  on(updateDeviceFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(removeDeviceSuccess, (state, { id }) => ({
    ...state,
    Devices: state.Devices.filter((Devices) => Devices.id !== id),
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
    Devices: devices,
    status: ActionStatus.SUCCESS,
  })),

  on(loadDevicesFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: ActionStatus.ERROR,
  }))
);
