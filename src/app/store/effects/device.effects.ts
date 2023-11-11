import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    addDevice,
    addDeviceSuccess,
    addDeviceFailure,
    loadDevices,
    loadDevicesSuccess,
    loadDevicesFailure,
    updateDevice,
    updateDeviceSuccess,
    updateDeviceFailure,
    removeDevice,
    removeDeviceFailure,
    removeDeviceSuccess,
} from '../actions/device.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { DeviceHttpService } from 'src/app/services/http-service/device-http.service';
import { Device } from 'src/app/models/devices.interface';


@Injectable()
export class DeviceEffects {
  constructor(
    private actions$: Actions,

    private deviceService: DeviceHttpService
  ) {}

  // Run this code when a loadTodos action is dispatched
  loadDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDevices),
      switchMap(() =>
        // Call the get method, convert it to an observable
        from(this.deviceService.getDevices()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((Devices) => loadDevicesSuccess({ devices: Devices })),
          // Or... if it errors return a new failure action containing the error
          catchError((error) => of(loadDevicesFailure({ error })))
        )
      )
    )
  );

  deleteDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeDevice),
      mergeMap((action) =>
        this.deviceService.deleteDevice(action.id).pipe(
          map(() => removeDeviceSuccess({ id: action.id })),
          catchError((error) => of(removeDeviceFailure({ error })))
        )
      )
    )
  );

  updateDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateDevice),
      mergeMap((action) =>
        this.deviceService.editDevice(action.id, action.content).pipe(
          map(() =>
            updateDeviceSuccess({ id: action.id, content: action.content })
          ),
          catchError((error) => of(updateDeviceFailure({ error })))
        )
      )
    )
  );

  resgiterDevice$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addDevice),
    mergeMap((action) =>
      this.deviceService.resgiterDevice(action.content).pipe(
        map((response) => {
          const userResponse = response as Device; 
          return addDeviceSuccess({ content: userResponse });
        }),
        catchError((error) => of(addDeviceFailure({ error })))
      )
    )
  )
);
}
