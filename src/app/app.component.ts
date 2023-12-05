import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@stores/reducers/index.reducer';
import {
  selectDicesAmount,
  selectDicesSelected,
  selectDicesSelectedSum,
  selectHasRolled,
} from '@stores/dice/dice.selector';
import {
  DEFAULT_DICES_NAMES,
  MAXIMUM_SELECTABLE_DICES_AMOUNT,
} from '@constants/dices.constants';
import { DiceType, SelectedDice } from '@interfaces/dice.interface';
import {
  addToAmount,
  removeFromAmount,
  resetDices,
  rollDices,
} from '@stores/dice/dice.action';
import { DiceComponent } from '@components/dice.component';
import { fromEntries } from 'utils/object.util';
import { SvgIconComponent } from '@components/icons/svg-icon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DiceComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  currentDicesAmount$!: Observable<number>;
  currentSelectedDices$!: Observable<SelectedDice>;
  dicesAmount = 0;
  selectableDices = DEFAULT_DICES_NAMES;
  currentHasRolled$: Observable<boolean>;
  currentSelectedDicesSum$: Observable<number>;
  title = 'Dices';

  constructor(private store: Store<State>) {
    this.currentDicesAmount$ = store.select(selectDicesAmount);
    this.currentSelectedDices$ = store.select(selectDicesSelected);
    this.currentHasRolled$ = store.select(selectHasRolled);
    this.currentSelectedDicesSum$ = store.select(selectDicesSelectedSum);

    this.currentDicesAmount$.subscribe(
      (dicesAmount) => (this.dicesAmount = dicesAmount),
    );
  }

  add(dice: DiceType) {
    this.store.dispatch(addToAmount({ dice }));
  }

  remove(dice: string) {
    this.store.dispatch(removeFromAmount({ dice: dice as DiceType }));
  }

  rollDices() {
    this.store.dispatch(rollDices());
  }

  resetDices() {
    this.store.dispatch(resetDices());
  }

  hasReachedMaximumDicesAmount() {
    return this.dicesAmount >= MAXIMUM_SELECTABLE_DICES_AMOUNT;
  }

  get selectedDices() {
    const dices: { key: DiceType; value: number[]; qty: number }[] = [];

    const subscription = this.currentSelectedDices$.subscribe(
      (selectedDices) => {
        fromEntries(selectedDices, (key, diceQty) => {
          if (diceQty.length > 0) {
            dices.push({ key, qty: diceQty.length, value: diceQty });
          }
        });
      },
    );

    subscription.unsubscribe();

    return dices;
  }

  getDices(dice: string, amount: number, value: number[]) {
    const dices: { type: DiceType; value: number }[] = [];

    for (let i = 0; i < amount; i++) {
      dices.push({
        type: dice as DiceType,
        value: value[i],
      });
    }

    return dices;
  }
}
