import { DiceQty, DiceType, SelectedDice } from "@interfaces/dice.interface";

export const DEFAULT_DICES_NUMBER = [4, 6, 10, 12, 20] as const;

export const DEFAULT_DICES_NAMES = DEFAULT_DICES_NUMBER.map(
  (diceNumber) => `d${diceNumber}`,
) as DiceType[];

export const DEFAULT_DICES_QTY = Object.fromEntries(
  DEFAULT_DICES_NUMBER.map((diceNumber) => [`d${diceNumber}`, diceNumber]),
) as DiceQty;

export const DEFAULT_DICES_SELECTED = Object.fromEntries(
  DEFAULT_DICES_NAMES.map((diceName) => [diceName, [] as number[]]),
) as SelectedDice;

export const MAXIMUM_SELECTABLE_DICES_AMOUNT = 10;
