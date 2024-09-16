import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CurrencyService],
    });
    service = TestBed.inject(CurrencyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch currency data and set bid', fakeAsync(() => {
    const mockResponse = {
      USDBRL: {
        bid: '5.25',
      },
    };

    service.getCurrency();

    const req = httpMock.expectOne(service['url']);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);

    tick();

    expect(service['bid']).toBe('5.25');
  }));

  it('should return the current currency code', fakeAsync(() => {
    let currencyCode: string | undefined;

    service.getCurrencyCode().subscribe((code) => {
      currencyCode = code;
    });

    tick();

    expect(currencyCode).toBe('BRL');
  }));

  it('should toggle the currency code', fakeAsync(() => {
    let currencyCode: string | undefined;

    service.getCurrencyCode().subscribe((code) => {
      currencyCode = code;
    });

    tick();

    expect(currencyCode).toBe('BRL');

    service.toggleCurrencyCode();

    tick();

    expect(currencyCode).toBe('USD');

    service.toggleCurrencyCode();

    tick();

    expect(currencyCode).toBe('BRL');
  }));

  it('should convert currency based on the current currency code', () => {
    service['bid'] = '5.25';

    let convertedValue = service.convertCurrency(10);
    expect(convertedValue).toBe(10);

    service.toggleCurrencyCode();
    convertedValue = service.convertCurrency(10);
    expect(convertedValue).toBeCloseTo(1.9, 2);
  });
});
