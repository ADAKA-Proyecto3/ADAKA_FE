import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserHttpService } from 'src/app/services/http-service/user-http.service';
import {
  loadActiveUser,
  loadActiveUserFailure,
  loadActiveUserSuccess,
} from '../actions/activeUser.actions';
import { catchError, from, map, of, switchMap } from 'rxjs';
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
}
