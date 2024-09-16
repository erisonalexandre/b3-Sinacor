import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyService } from '@services/currency/currency.service';

@Pipe({
  name: 'currencyConverter',
  pure: false,
})
export class CurrencyConverterPipe implements PipeTransform {
  constructor(public currencyService: CurrencyService) {}

  transform(value: number): string {
    const valueConverted = this.currencyService.convertCurrency(value);
    const currencyCode$ = this.currencyService.getCurrencyCode();

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currencyCode$.value,
    }).format(valueConverted);
  }
}
