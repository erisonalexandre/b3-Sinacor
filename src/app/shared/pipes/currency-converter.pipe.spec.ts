import { TestBed } from '@angular/core/testing';
import { CurrencyService } from '@app/core/services/currency/currency.service';
import { BehaviorSubject } from 'rxjs';
import { CurrencyConverterPipe } from './currency-converter.pipe';

describe('Pipe: CurrencyConverter', () => {
  let pipe: CurrencyConverterPipe;
  let currencyServiceMock: jasmine.SpyObj<CurrencyService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CurrencyService', [
      'convertCurrency',
      'getCurrencyCode',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CurrencyConverterPipe,
        { provide: CurrencyService, useValue: spy },
      ],
    });

    pipe = TestBed.inject(CurrencyConverterPipe);
    currencyServiceMock = TestBed.inject(
      CurrencyService,
    ) as jasmine.SpyObj<CurrencyService>;
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should convert and format the currency correctly', () => {
    const value = 100;
    const convertedValue = 500;
    const currencyCode = 'USD';

    currencyServiceMock.convertCurrency.and.returnValue(convertedValue);
    currencyServiceMock.getCurrencyCode.and.returnValue(
      new BehaviorSubject(currencyCode),
    );

    const result = pipe.transform(value);

    expect(currencyServiceMock.convertCurrency).toHaveBeenCalledWith(value);
    expect(currencyServiceMock.getCurrencyCode).toHaveBeenCalled();
    expect(result).toBe(
      new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: currencyCode,
      }).format(convertedValue),
    );
  });
});
