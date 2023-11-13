import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapInfoHttpService } from 'src/app/services/http-service/mapInfo-http.service';
import {
  loadMapInfo,
  loadMapInfoFailure,
  loadMapInfoSuccess,
} from '../actions/mapInfo.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';

@Injectable()
export class MapInfoEffects {
  constructor(
    private actions$: Actions,
    private mapService: MapInfoHttpService
  ) {}

  loadMapInfo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMapInfo),
      switchMap(() =>
        from(this.mapService.getMapInfo()).pipe(
          map((data) => loadMapInfoSuccess({ mapInfo: data })),
          catchError((error) => of(loadMapInfoFailure({ error })))
        )
      )
    )
  );
}
