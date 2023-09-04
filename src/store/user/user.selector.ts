import {createSelector} from 'reselect';
import {RootState} from '../store';

const userSelector = (state: RootState) => state.user;

export const selectCurrentUser = createSelector(
  [userSelector],
  user => user.currentUser,
);

export const selectUserIsloading = createSelector(
  [userSelector],
  user => user.isLoading,
);

export const selectUserError = createSelector(
  [userSelector],
  user => user.error,
);

export const selectUserIsFirstTimeOpen = createSelector(
  [userSelector],
  user => user.isFirstTimeOpen,
);
