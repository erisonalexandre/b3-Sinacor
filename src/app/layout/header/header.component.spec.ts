import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { HeaderComponent } from './header.component';
import { AuthService } from '@app/core/services/auth/auth.service';
import { CurrencyService } from '@services/currency/currency.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceMock: any;
  let currencyServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    authServiceMock = {
      currentUser: jasmine
        .createSpy('currentUser')
        .and.returnValue(of({ username: 'testuser' })),
      logout: jasmine.createSpy('logout').and.returnValue(of({})),
    };

    currencyServiceMock = {
      getCurrencyCode: jasmine
        .createSpy('getCurrencyCode')
        .and.returnValue(of('USD')),
      toggleCurrencyCode: jasmine.createSpy('toggleCurrencyCode'),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [MatToolbarModule, MatMenuModule, MatIconModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CurrencyService, useValue: currencyServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set username on init', () => {
    expect(component.username).toBe('testuser');
  });

  it('should call toggleCurrencyCode when toggleCurrency is called', () => {
    component.toggleCurrency();
    expect(currencyServiceMock.toggleCurrencyCode).toHaveBeenCalled();
  });

  it('should navigate to login on logout', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should have currencyCode$ observable', (done) => {
    component.currencyCode$.subscribe((currencyCode) => {
      expect(currencyCode).toBe('USD');
      done();
    });
  });

  it('should call currentUser on AuthService when component initializes', () => {
    expect(authServiceMock.currentUser).toHaveBeenCalled();
  });

  it('should call getCurrencyCode on CurrencyService when component initializes', () => {
    expect(currencyServiceMock.getCurrencyCode).toHaveBeenCalled();
  });
});
