import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MedicalCenterState } from '../reducers/medicalCenter.reducer';


export const selectMedicalCenters = (state: AppState) => state.medicalCenters;

export const selectAllMedicalCenters = createSelector(
  selectMedicalCenters,
  (state: MedicalCenterState) => state.medicalCenters
);
