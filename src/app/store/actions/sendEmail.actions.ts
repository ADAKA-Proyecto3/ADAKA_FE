import { createAction, props } from '@ngrx/store';

//actions para password recovery

export const sendPasswordRecoveryInstructions = createAction(
  '[Password Recovery Page] Send Email',
  props<{ content: string }>()
);

export const sendPasswordRecoveryInstructionsSuccess = createAction(
  '[Password Recovery Page] Send Email Success',
  props<{ content: string }>()
);

export const sendPasswordRecoveryInstructionsFailure = createAction(
  '[Password Recovery Page] Send Email Failure',
  props<{ error: any }>()
);

//actions para enviar correo de...
