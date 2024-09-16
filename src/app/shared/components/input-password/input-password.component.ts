import { Component, Input } from '@angular/core';
import { InputBaseComponent } from '../input-base/input-base.component';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrls: ['./input-password.component.scss'],
})
export class InputPasswordComponent extends InputBaseComponent<string> {
  @Input() mask: string = '';

  typeInput: string = 'password';

  changeVision() {
    this.typeInput = this.typeInput === 'password' ? 'text' : 'password';
  }

  changeModel(value: any) {
    let valueResult = value;
    this.updateValue(valueResult);
  }

  private updateValue(value: any) {
    this.onChange(value);
    this.value = value;
  }
}
