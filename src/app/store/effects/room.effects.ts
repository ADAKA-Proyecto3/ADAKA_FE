import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { RoomHttpService } from 'src/app/services/http-service/room-http.service';
import {
  addRoom,
  addRoomFailure,
  addRoomSuccess,
  loadRooms,
  loadRoomsByMedicalCenter,
  loadRoomsByMedicalCenterFailure,
  loadRoomsByMedicalCenterSuccess,
  loadRoomsFailure,
  loadRoomsSuccess,
  removeRoom,
  removeRoomFailure,
  removeRoomSuccess,
  updateAddRoomDevice,
  updateAddRoomDeviceFailure,
  updateAddRoomDeviceSucess,
  updateRoom,
  updateRoomFailure,
  updateRoomSucess,
} from '../actions/room.actions';

@Injectable()
export class RoomEffects {
  constructor(
    private actions$: Actions,

    private roomService: RoomHttpService
  ) {}

  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRooms),
      switchMap((action) =>
        from(this.roomService.getRoomsByUser(action.id)).pipe(
          map((room) => loadRoomsSuccess({ rooms: room })),

          catchError((error) => of(loadRoomsFailure({ error })))
        )
      )
    )
  );

  // loadRoomsByMedicalCenter$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(loadRoomsByMedicalCenter),
  //     switchMap((action) =>

  //       from(this.roomService.getRoomsByMedicalCenter(action.id)).pipe(

  //         map((room) => loadRoomsByMedicalCenterSuccess({ rooms: room })),

  //         catchError((error) => of(loadRoomsByMedicalCenterFailure({ error })))
  //       )
  //     )
  //   )
  // );

  deleteRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeRoom),
      mergeMap((action) =>
        this.roomService.deleteRoom(action.id).pipe(
          map(() => removeRoomSuccess({ id: action.id })),
          catchError((error) => of(removeRoomFailure({ error })))
        )
      )
    )
  );

  updateRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateRoom),
      mergeMap((action) =>
        this.roomService
          .editRoom(action.id, action.medicalCenterId, action.content)
          .pipe(
            map(() =>
              updateRoomSucess({ id: action.id, content: action.content })
            ),
            catchError((error) => of(updateRoomFailure({ error })))
          )
      )
    )
  );

  updateAddRoomDevice$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateAddRoomDevice),
      mergeMap((action) =>
        this.roomService
          .updateAddRoomDevice(action.roomId, action.deviceId)
          .pipe(
            map((response) =>
              updateAddRoomDeviceSucess({
                roomId: action.roomId,
                content: response,
              })
            ),
            catchError((error) => of(updateAddRoomDeviceFailure({ error })))
          )
      )
    )
  );

  resgiterRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRoom),
      mergeMap((action) =>
        this.roomService.resgiterRoom(action.id, action.content).pipe(
          map((respose) => addRoomSuccess({ content: respose })),
          catchError((error) => of(addRoomFailure({ error })))
        )
      )
    )
  );
}
