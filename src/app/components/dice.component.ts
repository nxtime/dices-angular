import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '@stores/reducers/index.reducer';
import { DiceType, SelectedDice } from '@interfaces/dice.interface';
import { DEFAULT_DICES_QTY } from '@constants/dices.constants';
import { Observable, firstValueFrom, take } from 'rxjs';
import { selectDicesSelected, selectHasRolled } from '@stores/dice/dice.selector';

@Component({
  selector: 'dice',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.less',
})
export class DiceComponent {
  title = 'Dice';
  @Input() dice!: DiceType;
  @Input() isDisabled = false;
  @Input() onClick: (dice: DiceType) => void = () => {};
  @Input() value!: number;
  @Input() showValue = false;
  hasRolled = false;
  diceValue: number = 0;
  currentSelectedDices$: Observable<SelectedDice>;
  currentHasRolled$!: Observable<boolean>;

  constructor(private store: Store<State>) {
    this.currentSelectedDices$ = this.store.select(selectDicesSelected);
    this.currentHasRolled$ = this.store.select(selectHasRolled);

    this.currentHasRolled$.subscribe((hasRolled) => {
      this.hasRolled = hasRolled;
    });
  }

  get actionClass() {
    console.log({ hasRolled: this.hasRolled });
    if (!this.hasRolled) return '';

    if (this.value === 1) {
      return '_failure';
    }

    if (this.value === DEFAULT_DICES_QTY[this.dice]) {
      return '_success';
    }

    return '';
  }
}
