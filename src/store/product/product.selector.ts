import {createSelector} from 'reselect';
import {RootState} from '../store';

const productSelector = (state: RootState) => state.product;

export const selectProduct = createSelector(
  [productSelector],
  product => product.product,
);

export const selectProductIsLoading = createSelector(
  [productSelector],
  product => product.isLoading,
);

export const selectProductError = createSelector(
  [productSelector],
  product => product.error,
);
