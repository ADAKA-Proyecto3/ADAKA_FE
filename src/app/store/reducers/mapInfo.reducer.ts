import { createReducer, on } from '@ngrx/store';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';
import { MapInfo } from 'src/app/models/map-info.interface';
import {
  loadMapInfo,
  loadMapInfoFailure,
  loadMapInfoSuccess,
} from '../actions/mapInfo.actions';

export interface MapInfoState {
  mapInfo: MapInfo[];
  error: any;
  status: ActionStatus;
}

export const initialState: MapInfoState = {
    mapInfo: [],
    error: '',
    status: ActionStatus.PENDING,
};

export const mapInfoReducer = createReducer(
  initialState,

  on(loadMapInfo, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(loadMapInfoSuccess, (state, { mapInfo }) => ({
    ...state,
    mapInfo: mapInfo,
    status: ActionStatus.SUCCESS,
  })),

  on(loadMapInfoFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: ActionStatus.ERROR,
  }))
);
