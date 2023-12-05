import { DEFAULT_DICES_NUMBER } from '@constants/dices.constants';

type DiceNumber = (typeof DEFAULT_DICES_NUMBER)[number];

type DiceType = `d${DiceNumber}`;

type SelectedDice = {
  [k in DiceType]: number[];
};

type DiceQty = {
  [k in DiceType]: k extends `d${infer n extends number}` ? n : never;
};

interface DicesState {
  selectedDices: SelectedDice;
  selectableDicesAmount: number;
  hasRolled: boolean;
  selectedDicesSum: number;
}

export type { DiceNumber, DiceType, DiceQty, SelectedDice, DicesState };
