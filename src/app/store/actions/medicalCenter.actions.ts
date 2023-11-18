import { createAction, props } from '@ngrx/store';
import { MedicalCenter } from 'src/app/models/medical-center.interface';

export const addMedicalCenter = createAction(
  '[Medical Center Page] Add Medical Center',
  props<{ id: number; content: MedicalCenter }>()
);

export const addMedicalCenterSuccess = createAction(
  '[Medical Center Page] Add Medical Center Success',
  props<{ content: MedicalCenter }>()
);

export const addMedicalCenterFailure = createAction(
  '[Medical Center Page] Add Medical Center Failure',
  props<{ error: any }>()
);

//Updating Medical Center
export const updateMedicalCenter = createAction(
  '[Medical Center Page] Update Medical Center',
  props<{ id: number; content: MedicalCenter }>()
);

export const updateMedicalCenterSucess = createAction(
  '[Medical Center Page] Update Medical Center Success',
  props<{ id: number; content: MedicalCenter  }>()
);

export const updateMedicalCenterFailure = createAction(
  '[Medical Center Page] Update Medical Center Failure',
  props<{ error: any }>()
);

//Updating Medical Center State
export const updateMedicalCenterState = createAction(
  '[Medical Center Page] Update Medical Center State',
  props<{ id: number; state: string }>()
);

export const updateMedicalCenterStateSucess = createAction(
  '[Medical Center Page] Update Medical Center State Success',
  props<{ content: MedicalCenter }>()
);

export const updateMedicalCenterStateFailure = createAction(
  '[Medical Center Page] Update Medical Center State Failure',
  props<{ error: any }>()
);

//Deleting Medical Center
export const removeMedicalCenter = createAction(
  '[Medical Center Page] Remove Medical Center',
  props<{ id: number }>()
);

export const removeMedicalCenterSuccess = createAction(
  '[Medical Center Page] Remove Medical Center Success',
  props<{ id: number }>()
);

export const removeMedicalCenterFailure = createAction(
  '[Medical Center Page] Remove Medical Center Failure',
  props<{ error: any }>()
);

//Loading Medical Center
export const loadMedicalCenter = createAction(
  '[Medical Center Page] Load Medical Center',
  props<{ id: number }>()
);

export const loadMedicalCenterSuccess = createAction(
  '[Medical Center API] Medical Center Load Success',
  props<{ medicalCenter: MedicalCenter[] }>()
);

export const loadMedicalCenterFailure = createAction(
  '[Medical Center API] Medical Center Load Failure',
  props<{ error: any }>()
);


export const loadMedicalCenterForSubUser = createAction(
  '[Medical Center Page] Load Medical Center ForSubUser',
  props<{ id: number }>()
);

export const loadMedicalCenterForSubUserSuccess = createAction(
  '[Medical Center API] Medical Center Load Success ForSubUser',
  props<{ medicalCenter: MedicalCenter[] }>()
);

export const loadMedicalCenterForSubUserFailure = createAction(
  '[Medical Center API] Medical Center Load Failure ForSubUser',
  props<{ error: any }>()
);
