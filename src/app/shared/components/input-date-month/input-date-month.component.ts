import { AfterViewInit, Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerInputEvent,
} from '@angular/material/datepicker';
import { InputBaseComponent } from '@shared/components/input-base/input-base.component';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-input-date-month',
  templateUrl: './input-date-month.component.html',
  styleUrls: ['./input-date-month.component.scss'],
})
export class InputDateMonthComponent
  extends InputBaseComponent<Date>
  implements AfterViewInit
{
  inputFormControl = new UntypedFormControl(new Date());

  ngAfterViewInit(): void {
    this.inputFormControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.onChange(this.inputFormControl.value);
      });
  }

  override writeValue(value: Date): void {
    if (value) {
      this.inputFormControl.setValue(new Date(value));
    }
  }

  mesAnterior(): void {
    const dataAtual = this.inputFormControl.value;
    const mesAnterior = new Date(dataAtual.setMonth(dataAtual.getMonth() - 1));
    this.inputFormControl.setValue(mesAnterior);
  }

  mesProximo(): void {
    const dataAtual = this.inputFormControl.value;
    const mesProximo = new Date(dataAtual.setMonth(dataAtual.getMonth() + 1));
    this.inputFormControl.setValue(mesProximo);
  }

  alterarData(event: MatDatepickerInputEvent<Date>): void {
    this.inputFormControl.setValue(event.value);
  }

  setMes(event: Date, datePicker: MatDatepicker<Date>): void {
    const novaData: Date = new Date(event.getFullYear(), event.getMonth(), 1);
    this.inputFormControl.setValue(novaData);
    datePicker.close();
  }
}
