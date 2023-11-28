import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  removeMedicalCenter,
  loadMedicalCenter,
  loadMedicalCenterFailure,
  loadMedicalCenterSuccess,
  removeMedicalCenterFailure,
  removeMedicalCenterSuccess,
  updateMedicalCenter,
  updateMedicalCenterFailure,
  updateMedicalCenterSucess,
  addMedicalCenter,
  addMedicalCenterSuccess,
  addMedicalCenterFailure,
  loadMedicalCenterForSubUser,
  loadMedicalCenterForSubUserFailure,
  loadMedicalCenterForSubUserSuccess,
  updateMedicalCenterState,
  updateMedicalCenterStateSucess,
  updateMedicalCenterStateFailure,
} from '../actions/medicalCenter.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { MedicalCenterHttpService } from 'src/app/services/http-service/medicalCenter-http.service';
import { MedicalCenter } from 'src/app/models/medical-center.interface';


@Injectable()
export class MedicalCenterEffects {
  
  constructor(
    private actions$: Actions,
    private medicalService: MedicalCenterHttpService
  ) {}

  loadMedicalCenter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMedicalCenter),
      switchMap((action) =>
        from(this.medicalService.getMedicalCenters(action.id)).pipe(
          map((medicalCenter) =>
            loadMedicalCenterSuccess({ medicalCenter: medicalCenter })
          ),
          catchError((error) => of(loadMedicalCenterFailure({ error })))
        )
      )
    )
  );

  loadMedicalCenterForSubUser$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadMedicalCenterForSubUser),
    switchMap((action) =>
      from(this.medicalService.getAssignedMedicalCenterForSubUser(action.id)).pipe(
        map((medicalCenter) =>
          loadMedicalCenterForSubUserSuccess({ medicalCenter: medicalCenter })
        ),
        catchError((error) => of(loadMedicalCenterForSubUserFailure({ error })))
      )
    )
  )
);

  deleteMedicalCenter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeMedicalCenter),
      mergeMap((action) =>
        this.medicalService.deleteMedicalCenter(action.id).pipe(
          map(() => removeMedicalCenterSuccess({ id: action.id })),
          catchError((error) => of(removeMedicalCenterFailure({ error })))
        )
      )
    )
  );

  updateMedicalCenter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateMedicalCenter),
      mergeMap((action) =>
        this.medicalService.editMedicalCenter(action.id, action.content).pipe(
          map(() =>
            updateMedicalCenterSucess({
              id: action.id,
              content: action.content,
            })
          ),
          catchError((error) => of(updateMedicalCenterFailure({ error })))
        )
      )
    )
  );

  updateMedicalCenterState$ = createEffect(() =>
  this.actions$.pipe(
    ofType(updateMedicalCenterState),
    mergeMap((action) =>
      this.medicalService.editStatusMedicalCenter(action.id, action.state).pipe(
        map((response) => updateMedicalCenterStateSucess({ content: response as MedicalCenter })),
        catchError((error) => of(updateMedicalCenterStateFailure({ error })))
      )
    )
  )
);

  registerMedicalCenter$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addMedicalCenter),
    mergeMap((action) =>
      this.medicalService.registerMedicalCenter(action.id, action.content).pipe(
        map((response) => addMedicalCenterSuccess({ content: response })),
        catchError((error) => of(addMedicalCenterFailure({ error })))
      )
    )
  )
);

}
