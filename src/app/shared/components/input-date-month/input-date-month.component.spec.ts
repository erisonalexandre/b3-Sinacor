import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputDateMonthComponent } from './input-date-month.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

describe('InputDateMonthComponent', () => {
  let component: InputDateMonthComponent;
  let fixture: ComponentFixture<InputDateMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputDateMonthComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NoopAnimationsModule,
        MatIconModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputDateMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize inputFormControl with current date', () => {
    const currentDate = new Date();
    const inputDate = component.inputFormControl.value;
    expect(inputDate.getFullYear()).toEqual(currentDate.getFullYear());
    expect(inputDate.getMonth()).toEqual(currentDate.getMonth());
  });

  it('should call onChange when inputFormControl value changes', () => {
    spyOn(component, 'onChange');
    component.inputFormControl.setValue(new Date());
    expect(component.onChange).toHaveBeenCalledWith(
      component.inputFormControl.value,
    );
  });

  it('should set value correctly in writeValue', () => {
    const date = new Date(2022, 5, 15);
    component.writeValue(date);
    expect(component.inputFormControl.value).toEqual(date);
  });

  it('should decrement month correctly in mesAnterior', () => {
    const initialDate = new Date(2022, 5, 15);
    component.inputFormControl.setValue(initialDate);
    component.mesAnterior();
    const expectedDate = new Date(2022, 4, 15);
    expect(component.inputFormControl.value).toEqual(expectedDate);
  });

  it('should increment month correctly in mesProximo', () => {
    const initialDate = new Date(2022, 5, 15);
    component.inputFormControl.setValue(initialDate);
    component.mesProximo();
    const expectedDate = new Date(2022, 6, 15);
    expect(component.inputFormControl.value).toEqual(expectedDate);
  });

  it('should set value correctly in alterarData', () => {
    const event = {
      value: new Date(2022, 5, 15),
    } as MatDatepickerInputEvent<Date>;
    component.alterarData(event);
    expect(component.inputFormControl.value).toEqual(event.value);
  });

  it('should set month correctly in setMes and close datePicker', () => {
    const datePicker = jasmine.createSpyObj('MatDatepicker', ['close']);
    const event = new Date(2022, 5, 15);
    component.setMes(event, datePicker);
    const expectedDate = new Date(2022, 5, 1);
    expect(component.inputFormControl.value).toEqual(expectedDate);
    expect(datePicker.close).toHaveBeenCalled();
  });
});
