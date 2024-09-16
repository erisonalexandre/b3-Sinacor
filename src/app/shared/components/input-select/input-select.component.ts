import { InputBaseSelectComponent } from '@app/shared/components/input-base-select/input-base-select.component';
import { Component, AfterViewInit } from '@angular/core';
import { distinctUntilChanged, Observable } from 'rxjs';

@Component({
  selector: 'app-input-select',
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
})
export class InputSelectComponent
  extends InputBaseSelectComponent
  implements AfterViewInit
{
  filteredOptions: Observable<any[]> | undefined;

  ngAfterViewInit(): void {
    this.inputFormControl.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe(() => {
        this.onChange(this.inputFormControl.value);
      });
  }
}
