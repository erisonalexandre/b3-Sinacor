import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { InputBaseComponent } from '@shared/components/input-base/input-base.component';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss'],
})
export class InputTextComponent
  extends InputBaseComponent<string>
  implements OnInit
{
  public override value: string = '';

  _mask: string | null = null;
  @ViewChild('input', { read: ElementRef }) input!: ElementRef;
  @Input() suffix: string = '';
  @Input() maxlength?: string;
  @Input() set mask(value: string | null) {
    this._mask = value;
  }
  get mask(): string | null {
    return this._mask;
  }

  hasSuffixClick = false;

  ngOnInit(): void {
    this.hasSuffixClick = this.suffixClick.observers.length > 0;
  }

  @Output()
  suffixClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() keyEnter: EventEmitter<KeyboardEvent> =
    new EventEmitter<KeyboardEvent>();

  handleKeyEnter(event: any) {
    this.keyEnter.emit(event);
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
