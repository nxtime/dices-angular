import { DiceType } from '@interfaces/dice.interface';
import { createAction, props } from '@ngrx/store';

interface DiceAmount {
  dice: DiceType;
}

export const addToAmount = createAction(
  'dice-to-amount',
  props<DiceAmount>(),
);

export const removeFromAmount = createAction(
    'dice-from-amount',
  props<DiceAmount>(),
);


export const rollDices = createAction(
  'roll-dices'
);

export const resetDices = createAction(
  'reset-dices'
);

export const diceActions = {
  addToAmount,
  removeFromAmount,
  rollDices,
  resetDices
}
