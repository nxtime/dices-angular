import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '@stores/reducers/index.reducer';

const dicesSelector = createFeatureSelector<State['dices']>('dices');

export const selectDicesAmount = createSelector(
  dicesSelector,
  (state) => state.selectableDicesAmount,
);

export const selectDicesSelected = createSelector(
  dicesSelector,
  (state) => state.selectedDices,
);

export const selectHasRolled = createSelector(
  dicesSelector,
  (state) => state.hasRolled,
);

export const selectDicesSelectedSum = createSelector(
  dicesSelector,
  (state) => state.selectedDicesSum,
);
