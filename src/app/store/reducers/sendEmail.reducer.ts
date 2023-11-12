import { createReducer, on } from '@ngrx/store';
import {
sendPasswordRecoveryInstructions,
sendPasswordRecoveryInstructionsSuccess,
sendPasswordRecoveryInstructionsFailure
} from '../actions/sendEmail.actions';
import { ActionStatus } from 'src/app/common/enums/action-status.enum';

export interface EmailState {
  emails: string[];
  error: any;
  status: ActionStatus;
}

export const initialState: EmailState = {
  emails: [],
  error: '',
  status: ActionStatus.PENDING,
};

export const sendEmailReducer = createReducer(
  initialState,

  //password Reducers for each action

  on(sendPasswordRecoveryInstructions, (state) => ({
    ...state,
    status: ActionStatus.LOADING,
  })),

  on(sendPasswordRecoveryInstructionsSuccess, (state, { content }) => ({
    ...state,
    users: [...state.emails, content],
    status: ActionStatus.SUCCESS,
  })),

  on(sendPasswordRecoveryInstructionsFailure, (state, action) => {
    return {
      ...state,
      error: action.error,
      status: ActionStatus.ERROR,
    };
  }),

);
