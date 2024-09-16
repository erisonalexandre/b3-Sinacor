import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputBaseComponent } from './input-base.component';

describe('InputBaseComponent', () => {
  let component: InputBaseComponent<any>;
  let fixture: ComponentFixture<InputBaseComponent<any>>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputBaseComponent],
    });
    fixture = TestBed.createComponent(InputBaseComponent);
    component = fixture.componentInstance;
  });

  it('deve emitir um evento de clique e mudar o valor de touched para true quando handleClick for chamado', () => {
    const mockMouseEvent = new MouseEvent('click');
    spyOn(component.clickInput, 'emit');
    spyOn(component, 'onTouched');

    component.handleClick(mockMouseEvent);

    expect(component.clickInput.emit).toHaveBeenCalledWith(mockMouseEvent);

    expect(component.touched).toBe(true);

    expect(component.onTouched).toHaveBeenCalled();
  });

  it('não deve mudar o valor de touched para true quando handleClick for chamado e touched já for true', () => {
    const mockMouseEvent = new MouseEvent('click');
    component.touched = true;
    spyOn(component.clickInput, 'emit');
    spyOn(component, 'onTouched');

    component.handleClick(mockMouseEvent);

    expect(component.clickInput.emit).toHaveBeenCalledWith(mockMouseEvent);

    expect(component.touched).toBe(true);

    expect(component.onTouched).not.toHaveBeenCalled();
  });

  it('deve previnir colagem quando disablePaste for true', () => {
    const mockEvent = new ClipboardEvent('paste');
    component.disablePaste = true;

    spyOn(mockEvent, 'preventDefault');

    component.onPaste(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });

  it('deve previnir on drop quando disablePaste for true', () => {
    const mockEvent = new DragEvent('drop');
    component.disablePaste = true;

    spyOn(mockEvent, 'preventDefault');

    component.onDrop(mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});
