import { ActionReducerMap } from '@ngrx/store';
import { dicesReducer } from '@stores/dice/dice.reducer';
import { DicesState } from '@interfaces/dice.interface';

export interface State {
  dices: DicesState;
}

export const reducers: ActionReducerMap<State> = {
  dices: dicesReducer,
};
