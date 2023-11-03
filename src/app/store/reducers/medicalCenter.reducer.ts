import { createReducer, on } from '@ngrx/store';
import {
  removeMedicalCenterSuccess,
  removeMedicalCenterFailure,
  loadMedicalCenterFailure,
  loadMedicalCenter,
  loadMedicalCenterSuccess,
  updateMedicalCenterSucess,
  updateMedicalCenterFailure,
  addMedicalCenterSuccess,
  addMedicalCenterFailure,
} from '../actions/medicalCenter.actions';
import { MedicalCenter } from 'src/app/models/medical-center.interface';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';

export interface MedicalCenterState {
  medicalCenters: MedicalCenter[];
  error: any;
  status: ActionStatus;
}
export const initialState: MedicalCenterState ={
  medicalCenters: [],
  error: '',
  status: ActionStatus.PENDING,
};
export const medicalCenterReducer = createReducer(
  
  initialState,

  on(addMedicalCenterSuccess, (state, { content }) => ({
    ...state,
    medicalCenters: [...state.medicalCenters, content],
    status: ActionStatus.SUCCESS,
  })),

  on(addMedicalCenterFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),


  on(updateMedicalCenterSucess, (state, { id, content }) => ({
    ...state,
    medicalCenters: state.medicalCenters.map((medicalCenter) => {
      if (medicalCenter.id === id) {
        return {
          ...medicalCenter,
          ...content,
        };
      }
      return medicalCenter;
    }),
  })),

  on(updateMedicalCenterFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(removeMedicalCenterSuccess, (state, { id }) => ({
    ...state,
    medicalCenters: state.medicalCenters.filter((medicalCenters) => medicalCenters.id !== id),
    status: ActionStatus.SUCCESS,
  })),

  on(removeMedicalCenterFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

  on(loadMedicalCenter, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(loadMedicalCenterSuccess, (state, { medicalCenter }) => ({
    ...state,
    medicalCenters: medicalCenter,
    status: ActionStatus.SUCCESS,
  })),

  on(loadMedicalCenterFailure, (state, { error }) => ({
    ...state,
    error: error,
    status: ActionStatus.ERROR,
  }))
);
