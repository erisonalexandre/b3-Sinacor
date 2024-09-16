import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/core/services/auth/auth.service';
import { CurrencyService } from '@services/currency/currency.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currencyCode$ = this.currencyService.getCurrencyCode();
  username = '';
  constructor(
    public currencyService: CurrencyService,
    public authService: AuthService,
    public router: Router,
  ) {
    this.authService.currentUser().subscribe((user) => {
      this.username = user?.username || '';
    });
  }

  toggleCurrency() {
    this.currencyService.toggleCurrencyCode();
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
