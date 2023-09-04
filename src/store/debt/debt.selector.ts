import {createSelector} from 'reselect';
import {RootState} from '../store';

const debtSelector = (state: RootState) => state.debt;

export const selectDebt = createSelector([debtSelector], debt => debt.debt);

export const selectDebtIsLoading = createSelector(
  [debtSelector],
  debt => debt.isLoading,
);

export const selectDebtError = createSelector(
  [debtSelector],
  debt => debt.error,
);
