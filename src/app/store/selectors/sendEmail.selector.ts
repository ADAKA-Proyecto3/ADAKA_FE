import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { EmailState } from '../reducers/sendEmail.reducer';


export const selectEmails = (state: AppState) => state.email;

export const selectEmailState = (state: AppState) => state.email;

export const selectAllEmails = createSelector(
    selectEmails,
  (state: EmailState) => state.emails
);

export const selectEmailStatus = createSelector(
    selectEmailState,
  (state: EmailState) => state.status
);