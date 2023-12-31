import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  removeUser,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailure,
  removeUserSuccess,
  removeUserFailure,
  updateUser,
  updateUserSucess,
  updateUserFailure,
  addSubUser,
  addSubUserSuccess,
  addSubUserFailure,
} from '../actions/user.actions';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { UserHttpService } from 'src/app/services/http-service/user-http.service';
import { User } from 'src/app/models/user.interface';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,

    private userService: UserHttpService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap((action) =>
        from(this.userService.getUsers(action.id)).pipe(
          map((users) => loadUsersSuccess({ users: users })),
          catchError((error) => of(loadUsersFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(removeUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.id).pipe(
          map(() =>
           removeUserSuccess({ id: action.id })
          ),
          catchError((error) => of(removeUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap((action) =>
        this.userService.editUser(action.id, action.content).pipe(
          map(() =>
            updateUserSucess({ id: action.id, content: action.content })
          ),
          catchError((error) => of(updateUserFailure({ error })))
        )
      )
    )
  );

  resgiterSubUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addSubUser),
      mergeMap((action) =>
        this.userService.resgiterSubUser(action.content, action.parentId, action.medicalCenterId).pipe(
          map((response) => {
            const userResponse = response as User; 
            return addSubUserSuccess({ content: userResponse });
          }),
          catchError((error) => of(addSubUserFailure({ error })))
        )
      )
    )
  );
}
