import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { RoomHttpService } from 'src/app/services/http-service/room-http.service';
import { addRoom, addRoomFailure, addRoomSuccess, loadRooms, loadRoomsFailure, loadRoomsSuccess, removeRoom, removeRoomFailure, removeRoomSuccess, updateRoom, updateRoomFailure, updateRoomSucess } from '../actions/room.actions';



@Injectable()
export class RoomEffects {
  constructor(
    private actions$: Actions,

    private roomService: RoomHttpService
  ) {}


  loadRooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRooms),
      switchMap(() =>
        
        from(this.roomService.getRooms()).pipe(
         
          map((rooms) => loadRoomsSuccess({ rooms: rooms })),
         
          catchError((error) => of(loadRoomsFailure({ error })))
        )
      )
    )
  );

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
        this.roomService.editRoom(action.id, action.content).pipe(
          map(() =>
            updateRoomSucess({ id: action.id, content: action.content })
          ),
          catchError((error) => of(updateRoomFailure({ error })))
        )
      )
    )
  );

  resgiterRoom$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addRoom),
      mergeMap((action) =>
        this.roomService.resgiterRoom(action.content).pipe(
          map(() => addRoomSuccess({ content: action.content })),
          catchError((error) => of(addRoomFailure({ error })))
        )
      )
    )
  );
}
