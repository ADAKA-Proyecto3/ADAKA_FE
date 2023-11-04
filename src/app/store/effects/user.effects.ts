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

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,

    private userService: UserHttpService
  ) {}

  // Run this code when a loadTodos action is dispatched
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        // Call the get method, convert it to an observable
        from(this.userService.getUsers()).pipe(
          // Take the returned value and return a new success action containing the todos
          map((users) => loadUsersSuccess({ users: users })),
          // Or... if it errors return a new failure action containing the error
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
        this.userService.resgiterSubUser(action.content).pipe(
          map(() => addSubUserSuccess({ content: action.content })),
          catchError((error) => of(addSubUserFailure({ error })))
        )
      )
    )
  );
}
