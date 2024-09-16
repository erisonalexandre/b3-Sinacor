import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private url = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';
  private bid?: string;
  private currencyCode$ = new BehaviorSubject<string>('BRL');

  constructor(private http: HttpClient) {}

  getCurrency() {
    this.http.get(this.url).subscribe((data: any) => {
      this.bid = data.USDBRL.bid;
    });
  }

  getCurrencyCode() {
    return this.currencyCode$;
  }

  toggleCurrencyCode() {
    this.currencyCode$.next(this.currencyCode$.value === 'BRL' ? 'USD' : 'BRL');
  }

  convertCurrency(value: number) {
    return this.currencyCode$.value === 'BRL'
      ? value
      : value / Math.abs(parseFloat(this.bid!));
  }
}
