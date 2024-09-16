import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputPasswordComponent } from './input-password.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared/shared.module';

describe('InputPasswordComponent', () => {
  let component: InputPasswordComponent;
  let fixture: ComponentFixture<InputPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputPasswordComponent],
      imports: [SharedModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default typeInput as password', () => {
    expect(component.typeInput).toBe('password');
  });

  it('should toggle typeInput between password and text', () => {
    component.changeVision();
    expect(component.typeInput).toBe('text');
    component.changeVision();
    expect(component.typeInput).toBe('password');
  });

  it('should update value and call onChange when changeModel is called', () => {
    spyOn(component, 'onChange');
    const testValue = 'testValue';
    component.changeModel(testValue);
    expect(component.onChange).toHaveBeenCalledWith(testValue);
    expect(component.value).toBe(testValue);
  });
});
