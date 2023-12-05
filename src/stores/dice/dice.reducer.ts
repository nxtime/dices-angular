import { createReducer, on } from '@ngrx/store';
import {
  DEFAULT_DICES_NUMBER,
  DEFAULT_DICES_QTY,
  DEFAULT_DICES_SELECTED,
} from '@constants/dices.constants';
import { DiceType, DicesState, SelectedDice } from '@interfaces/dice.interface';
import { diceActions } from './dice.action';

const selectedDices = DEFAULT_DICES_SELECTED;
const selectableDicesAmount = 0;

export const initialState: DicesState = {
  selectedDices,
  selectableDicesAmount,
  hasRolled: false,
  selectedDicesSum: 0,
};

const getRandomDiceNumber = (dice: string) => {
  return Math.ceil(
    Math.random() * DEFAULT_DICES_QTY[dice as DiceType],
  );

}

export const dicesReducer = createReducer(
  initialState,
  on(diceActions.addToAmount, (state, { dice }) => {
    const dicesAmount = state.selectableDicesAmount + 1;

    const diceValue = state.hasRolled ? getRandomDiceNumber(dice) : DEFAULT_DICES_QTY[dice];

    const currentSelectedDices = {
      ...state.selectedDices,
      [dice]: [...state.selectedDices[dice], diceValue],
    };

    return {
      ...state,
      selectableDicesAmount: dicesAmount,
      selectedDices: currentSelectedDices,
    };
  }),
  on(diceActions.removeFromAmount, (state, { dice }) => {
    const dicesAmount = Math.max(Math.abs(state.selectableDicesAmount - 1), 0);

    const currentSelectedDices = state.selectedDices[dice].filter(
      (_, index) => index !== 0,
    );

    return {
      ...state,
      selectableDicesAmount: dicesAmount,
      selectedDices: {
        ...state.selectedDices,
        [dice]: currentSelectedDices,
      },
    };
  }),
  on(diceActions.rollDices, (state) => {
    let total = 0;
    const selectedDices = Object.fromEntries(
      Object.entries(state.selectedDices).map(([diceName, dicesArray]) => {
        return [
          diceName as DiceType,
          dicesArray.map(() => {
            const rolledNumber = getRandomDiceNumber(diceName);
              total += rolledNumber;

            return rolledNumber;
          }),
        ];
      }),
    ) as SelectedDice;

    return {
      ...state,
      selectedDices,
      hasRolled: true,
      selectedDicesSum: total,
    };
  }),
  on(diceActions.resetDices, (state) => {
    return {
      ...state,
      selectableDicesAmount: 0,
      selectedDices,
      selectedDicesSum: 0,
      hasRolled: false
    };
  }),
);
