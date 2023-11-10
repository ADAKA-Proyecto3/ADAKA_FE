import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MapInfoState } from '../reducers/mapInfo.reducer';

export const selectMapInfo = (state: AppState) => state.mapInfo;

export const selectAllMedicalCenters = createSelector(
    selectMapInfo,
  (state: MapInfoState) => state.mapInfo
);
