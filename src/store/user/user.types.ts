export enum USER_ACTION_TYPES {
  FETCH_USER_START = 'FETCH_USER_START',
  FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS',
  FETCH_USER_FAILED = 'FETCH_USER_FAILED',

  POST_USER_START = 'POST_USER_START',
  POST_USER_SUCCESS = 'POST_USER_SUCCESS',
  POST_USER_FAILED = 'POST_USER_FAILED',

  PUT_USER_START = 'PUT_USER_START',
  PUT_USER_SUCCESS = 'PUT_USER_SUCCESS',
  PUT_USER_FAILED = 'PUT_USER_FAILED',

  POST_FIRST_TIME_OPEN_START = 'POST_FIRST_TIME_OPEN_START',
  POST_FIRST_TIME_OPEN_SUCCESS = 'POST_FIRST_TIME_OPEN_SUCCESS',
  POST_FIRST_TIME_OPEN_FAILED = 'POST_FIRST_TIME_OPEN_FAILED',
}

export type UserProps = {
  uid: string | number[];
  pin: string;
};

export type UserState = {
  currentUser: UserProps | null;
  isLoading: boolean;
  error: Error | null;
  isFirstTimeOpen: boolean;
};
