import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@app/shared/shared.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextComponent } from './input-text.component';

describe('InputTextComponent', () => {
  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputTextComponent],
      imports: [SharedModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve lidar com o evento keyEnter', () => {
    const keyEnterSpy = spyOn(component.keyEnter, 'emit');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    component.handleKeyEnter(event);
    expect(keyEnterSpy).toHaveBeenCalledWith(event);
  });
});
