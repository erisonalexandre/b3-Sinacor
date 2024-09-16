import { Component, Input } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-errors-label',
  templateUrl: './errors-label.component.html',
})
export class ErrorsLabelComponent {
  @Input() errors: ValidationErrors = [];
  @Input() label!: string;
}
