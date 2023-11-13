import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserHttpService } from 'src/app/services/http-service/user-http.service';
import {
  loadActiveUser,
  loadActiveUserFailure,
  loadActiveUserSuccess,
  updateActiveUser,
  updateActiveUserFailure,
  updateActiveUserSuccess
} from '../actions/activeUser.actions';
import { catchError, from, map, mergeMap, of, switchMap } from 'rxjs';
import { User } from 'src/app/models/user.interface';

@Injectable()
export class ActiveUserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserHttpService
  ) {}

loadActiveUser$ = createEffect(() =>
    this.actions$.pipe(
        ofType(loadActiveUser),
        switchMap((action) =>
            from(this.userService.getActiveUser(action.email)).pipe(
                map((user) => loadActiveUserSuccess({ user: user as User })),
                catchError((error) => of(loadActiveUserFailure({ error })))
            )
        )
    )
);


updateActiveUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateActiveUser),
      mergeMap((action) =>
      this.userService.editUser(action.id, action.content).pipe(
          map(() =>
            updateActiveUserSuccess({
              id: action.id,
              content: action.content,
            })
          ),
          catchError((error) => of(updateActiveUserFailure({ error })))
        )
      )
    )
  );

}
