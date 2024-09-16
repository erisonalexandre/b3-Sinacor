import {
  Component,
  EventEmitter,
  Input,
  Optional,
  Output,
  Self,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormGroupDirective,
  NgControl,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  template: '',
})
export class InputBaseComponent<T> implements ControlValueAccessor {
  @Output() clickInput = new EventEmitter<MouseEvent>();
  @Input() label!: string;
  @Input() placeholder = '';
  @Input() disablePaste = false;
  @Input() appearance: MatFormFieldAppearance = 'outline';

  public value!: T;
  public disabled = false;
  public touched = false;
  public matcher: ErrorStateMatcher = {
    isErrorState: () => {
      const parentForm = this._parentFormGroup || this._parentForm;
      const hasControlErrors = !!this.ngControl?.errors;

      if (!parentForm) {
        return this.touched && hasControlErrors;
      }

      return (this.touched || parentForm.submitted) && hasControlErrors;
    },
  };

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() public _parentForm?: NgForm,
    @Optional() public _parentFormGroup?: FormGroupDirective,
  ) {
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  get required() {
    const control = this.ngControl?.control;
    return control?.hasValidator(Validators.required);
  }

  writeValue(value: T): void {
    this.value = value;
  }

  registerOnChange(fn: (value: T) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange = (_value: T) => {
    //esta função é utilizada internamente pelo form
  };

  onTouched = () => {
    //esta função é utilizada internamente pelo form
  };

  handleClick(event: MouseEvent) {
    this.clickInput.emit(event);
    if (!this.touched) {
      this.touched = true;
      this.onTouched();
    }
  }

  onPaste(event: ClipboardEvent) {
    this.blockPaste(event);
  }

  onDrop(event: DragEvent) {
    this.blockPaste(event);
  }

  blockPaste(event: ClipboardEvent | DragEvent) {
    if (this.disablePaste) {
      event.preventDefault();
    }
  }
}
