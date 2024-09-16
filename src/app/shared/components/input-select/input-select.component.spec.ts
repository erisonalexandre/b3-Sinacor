import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSelectComponent } from './input-select.component';
import { SharedModule } from '@app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('InputSelectComponent', () => {
  let component: InputSelectComponent;
  let fixture: ComponentFixture<InputSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputSelectComponent],
      imports: [SharedModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar', () => {
    expect(component).toBeTruthy();
  });

  it('_clearable deve ser true', () => {
    component._clearable = true;
    expect(component._clearable).toBe(true);
  });

  it('_clearable deve ser falso', () => {
    component._clearable = false;
    expect(component._clearable).toBe(false);
  });

  it('deve limpar o valor do input', () => {
    component.value = 'someValue';
    const event = new Event('click');
    component.clearInput(event);
    expect(component.value).toBe('');
  });

  it('deve limpar o valor do input e chamar onChange', () => {
    component.value = 'someValue';

    const onChangeSpy = jasmine.createSpy('onChangeSpy');

    component.onChange = onChangeSpy;

    const event = new Event('click');

    component.clearInput(event);

    expect(component.value).toBe('');

    expect(onChangeSpy).toHaveBeenCalledWith('');
  });

  it('deve chamar onChange quando o valor de inputFormControl mudar', () => {
    const onChangeSpy = spyOn(component, 'onChange');

    component.inputFormControl.setValue('new value');

    fixture.detectChanges();

    expect(onChangeSpy).toHaveBeenCalledWith('new value');
  });

  it('deve retornar o valor correto baseado em _valueObject e tipo do valor', () => {
    component._valueObject = true;
    expect(component.getValue('testValue')).toBe('testValue');

    component._valueObject = false;
    const stringValue = 'stringValue';
    expect(component.getValue(stringValue)).toBe(stringValue);

    const nullValue = null;
    expect(component.getValue(nullValue)).toBeNull();
  });
});
