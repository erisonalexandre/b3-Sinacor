import { RouterTestingModule } from '@angular/router/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { CurrencyService } from './core/services/currency/currency.service';

describe('AppComponent', () => {
  let currencyServiceStub: Partial<CurrencyService>;

  beforeEach(async () => {
    currencyServiceStub = {
      getCurrency: jasmine.createSpy('getCurrency').and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      providers: [{ provide: CurrencyService, useValue: currencyServiceStub }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'b3-sinacor'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('b3-sinacor');
  });

  it('should call getCurrency on ngOnInit', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.ngOnInit();
    expect(currencyServiceStub.getCurrency).toHaveBeenCalled();
  });
});
