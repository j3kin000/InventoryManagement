import {createSelector} from 'reselect';
import {RootState} from '../store';

const inventorySelector = (state: RootState) => state.inventory;

export const selectInventory = createSelector(
  [inventorySelector],
  inventory => inventory.inventory,
);

export const selectInventoryIsLoading = createSelector(
  [inventorySelector],
  inventory => inventory.isLoading,
);

export const selectInventoryError = createSelector(
  [inventorySelector],
  inventory => inventory.error,
);
