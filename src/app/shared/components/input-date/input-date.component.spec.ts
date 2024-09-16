import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputDateComponent } from './input-date.component';
import { SharedModule } from '@app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputDateComponent', () => {
  let component: InputDateComponent;
  let fixture: ComponentFixture<InputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDateComponent],
      imports: [SharedModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit keyEnter event directly when Enter key is pressed', () => {
    const keyEnterSpy = spyOn(component.keyEnter, 'emit');
    const event = new KeyboardEvent('keyup', {
      key: 'Enter',
    });

    component.handleKeyEnter(event);

    expect(keyEnterSpy).toHaveBeenCalled();
  });

  it('should format value correctly when dateUtc is true', () => {
    component.dateUtc = true;
    const value = '2023-10-05T12:00:00';
    const formattedValue = component.formatValue(value);
    expect(formattedValue).toBe(new Date(value).toISOString());
  });

  it('should format value correctly when dateUtc is false', () => {
    component.dateUtc = false;
    const value = '2023-10-05T12:00:00';
    const formattedValue = component.formatValue(value);
    expect(formattedValue).toBe(value);
  });

  it('should set inputFormControl value correctly in writeValue', () => {
    const value = '2023-10-05T12:00:00';
    component.writeValue(value);
    expect(component.inputFormControl.value).toBe(value);
  });

  it('should set inputFormControl value correctly in writeValue when dateUtc is true', () => {
    component.dateUtc = true;
    const value = '2023-10-05T12:00:00';
    component.writeValue(value);
    expect(component.inputFormControl.value).toBe(
      new Date(value).toISOString().slice(0, 16),
    );
  });

  it('should disable inputFormControl when setDisabledState is called with true', () => {
    component.setDisabledState(true);
    expect(component.inputFormControl.disabled).toBeTrue();
  });

  it('should enable inputFormControl when setDisabledState is called with false', () => {
    component.setDisabledState(false);
    expect(component.inputFormControl.disabled).toBeFalse();
  });

  it('should call onChange with formatted value when inputFormControl value changes', () => {
    const onChangeSpy = spyOn(component, 'onChange');
    component.ngAfterViewInit();
    const value = '2023-10-05T12:00:00';
    component.inputFormControl.setValue(value);
    expect(onChangeSpy).toHaveBeenCalledWith(component.formatValue(value));
  });
});
