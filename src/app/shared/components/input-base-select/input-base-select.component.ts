import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ContentChild,
  TemplateRef,
} from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { InputBaseComponent } from '../input-base/input-base.component';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  template: '',
})
export class InputBaseSelectComponent
  extends InputBaseComponent<any>
  implements OnChanges
{
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;

  @Input() options: any[] = [];
  @Input() optionLabel: string = 'label';
  @Input() optionValue = 'value';
  @Input()
  set valueObject(value: boolean) {
    this._valueObject = value != null && `${value}` !== 'false';
  }
  _valueObject = false;
  @Input()
  set clearable(value: boolean) {
    this._clearable = value != null && `${value}` !== 'false';
  }
  _clearable = false;
  @Input() compareWith = (o1: any, o2: any) => o1 === o2;

  inputFormControl = new UntypedFormControl();

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['options'] &&
      changes['options'].currentValue !== changes['options'].previousValue
    ) {
      this.options = changes['options'].currentValue;
    }
  }

  getValue(value: any): any {
    if (this._valueObject) {
      return value;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return value;
    }

    return value?.[this.optionValue] ?? null;
  }

  clearableInput() {
    const hasValue =
      this.inputFormControl.value !== null &&
      this.inputFormControl.value !== '' &&
      this.inputFormControl.value !== undefined;
    return this._clearable && hasValue;
  }

  clearInput(event: Event) {
    this.value = '';
    this.inputFormControl.setValue('');
    this.onChange('');
    event.stopPropagation();
  }

  displayFn = (value: any): string => {
    return this._optionLabel(value);
  };

  _optionLabel(option: any): string {
    if (typeof option === 'string' || typeof option === 'number') {
      if (
        typeof this.options[0] === 'string' ||
        typeof this.options[0] === 'number'
      ) {
        return typeof option === 'string' ? option : option.toString();
      } else {
        return (
          (this.options as Record<string, any>[]).find(
            (opt) => opt[this.optionValue] === option,
          )?.[this.optionLabel] || ''
        );
      }
    }
    return option?.[this.optionLabel] || '';
  }

  override writeValue(value: any): void {
    this.inputFormControl.setValue(value);
  }

  override setDisabledState(isDisabled: boolean): void {
    isDisabled
      ? this.inputFormControl.disable()
      : this.inputFormControl.enable();
  }

  optionClick(event: MatAutocompleteSelectedEvent) {
    this.inputFormControl.setValue(event.option.value);
    this.onChange(event.option.value);
  }
}
