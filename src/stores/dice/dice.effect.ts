import { interval, from, of } from 'rxjs';
import { take, concatMap } from 'rxjs/operators';
import { ofType } from '@ngrx/effects';
import { diceActions } from './dice.action';

// Assuming you are using NgRx effects

@Effect()
rollDicesStaggered$ = interval(500).pipe(
  // Adjust the ofType() to match your action type
  ofType(diceActions.rollDices),
  take(10), // Replace NUMBER_OF_ITERATIONS with the desired number of iterations

  // Use concatMap to handle the asynchronous logic with staggered updates
  concatMap(() => {
    let total = 0;

    // Convert the asynchronous logic to an observable
    const rollDiceObservable = from(Object.entries(state.selectedDices)).pipe(
      concatMap(([diceName, dicesArray]) => {
        const rolledNumbers = dicesArray.map(() => {
          const rolledNumber = getRandomDiceNumber(diceName);
          total += rolledNumber;
          return rolledNumber;
        });

        const selectedDice = {
          [diceName as DiceType]: rolledNumbers,
        };

        // Dispatch the action with the updated state for each iteration
        return of(diceActions.rollDicesSuccess({
          selectedDices: selectedDice,
          hasRolled: true,
          selectedDicesSum: total,
        }));
      })
    );

    // Subscribe to the observable to trigger the staggered updates
    return rollDiceObservable;
  }),
);

