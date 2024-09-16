import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '@services/currency/currency.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'b3-sinacor';

  constructor(private currencyService: CurrencyService) {}

  ngOnInit() {
    this.currencyService.getCurrency();
  }
}
