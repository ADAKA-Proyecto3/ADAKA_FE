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
} from '../actions/medicalCenter.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { MedicalCenterHttpService } from 'src/app/services/http-service/medicalCenter-http.service';


@Injectable()
export class MedicalCenterEffects {
  constructor(
    private actions$: Actions,
    private medicalService: MedicalCenterHttpService
  ) {}

  // Run this code when a loadTodos action is dispatched
  loadMedicalCenter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMedicalCenter),
      switchMap((action) =>

        // Call the get method, convert it to an observable
        from(this.medicalService.getMedicalCenters(action.id)).pipe(
          // Take the returned value and return a new success action containing the todos
          map((medicalCenter) =>
            loadMedicalCenterSuccess({ medicalCenter: medicalCenter })
          ),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadMedicalCenterFailure({ error })))
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

  registerMedicalCenter$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addMedicalCenter),
    mergeMap((action) =>
      this.medicalService.resgiterMedicalCenter(action.id, action.content).pipe(
        map(() => addMedicalCenterSuccess({ content: action.content })),
        catchError((error) => of(addMedicalCenterFailure({ error })))
      )
    )
  )
);

}
