import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { InputBaseComponent } from '@shared/components/input-base/input-base.component';
import * as moment from 'moment';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent
  extends InputBaseComponent<string>
  implements AfterViewInit
{
  _type = 'date';
  dateUtc = false;
  @Input() min?: string;
  @Input() max: string = moment().add(20, 'year').format('yyyy-MM-ddThh:mm');
  @Input() step?: number;

  @Output() keyEnter: EventEmitter<KeyboardEvent> =
    new EventEmitter<KeyboardEvent>();

  inputFormControl = new UntypedFormControl();

  handleKeyEnter(event: any) {
    this.keyEnter.emit(event);
  }

  ngAfterViewInit(): void {
    this.inputFormControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        const _value = this.formatValue(this.inputFormControl.value);
        this.onChange(_value);
      });
  }

  override writeValue(value: string): void {
    let _value = value;

    if (this.dateUtc) {
      const date = new Date(value);
      if (!isNaN(date.getTime())) {
        _value = date.toISOString().slice(0, 16);
      }
    }

    this.inputFormControl.setValue(_value);
  }

  formatValue(value: string) {
    if (!value) {
      return value;
    }

    if (this.dateUtc) {
      const date = new Date(value);
      if (isNaN(date.getTime())) {
        return value;
      }
      return date.toISOString();
    }

    return value;
  }

  override setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.inputFormControl.disable()
      : this.inputFormControl.enable();
  }
}
