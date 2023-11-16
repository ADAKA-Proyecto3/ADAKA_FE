import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
    addDevice,
    addDeviceSuccess,
    addDeviceFailure,
    loadDevices,
    loadDevicesSuccess,
    loadDevicesFailure,
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

 
  loadDevices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDevices),
      switchMap((action) =>
        // Call the get method, convert it to an observable
        from(this.deviceService.getDevices(action.adminId)).pipe( 
          // Take the returned value and return a new success action containing all devices
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
        this.deviceService.deleteDevice(action.deviceId).pipe(
          map(() => removeDeviceSuccess({ deviceId: action.deviceId })),
          catchError((error) => of(removeDeviceFailure({ error })))
        )
      )
    )
  );

  resgiterDevice$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addDevice),
    mergeMap((action) =>
      this.deviceService.registerDevice(action.adminId, action.content).pipe(
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
