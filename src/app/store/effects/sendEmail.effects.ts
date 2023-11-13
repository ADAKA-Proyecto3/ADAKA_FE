import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
sendPasswordRecoveryInstructions,
sendPasswordRecoveryInstructionsSuccess,
sendPasswordRecoveryInstructionsFailure
} from '../actions/sendEmail.actions';
import { of } from 'rxjs';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { EmailSenderHttpService } from 'src/app/services/http-service/email_sender-http.service';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private emailService: EmailSenderHttpService
  ) {}

  sendPasswordRecoveryInstructions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(sendPasswordRecoveryInstructions),
      mergeMap((action) =>
        this.emailService.sendPasswordRecoveryInstructions(action.content).pipe(
          map((response) => {
            const emailResponse = response as string;
            return sendPasswordRecoveryInstructionsSuccess({ content: emailResponse });
          }),
          catchError((error) => of(sendPasswordRecoveryInstructionsFailure({ error })))
        )
      )
    )
  );
}
