import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FluxoCaixaResumoComponent } from './fluxo-caixa-resumo.component';
import { FluxoCaixaService } from '@services/fluxo-caixa/fluxo-caixa.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyConverter' })
class MockCurrencyConverterPipe implements PipeTransform {
  transform(value: any): any {
    return value;
  }
}

describe('FluxoCaixaResumoComponent', () => {
  let component: FluxoCaixaResumoComponent;
  let fixture: ComponentFixture<FluxoCaixaResumoComponent>;
  let fluxoCaixaService: jasmine.SpyObj<FluxoCaixaService>;

  beforeEach(async () => {
    const fluxoCaixaServiceSpy = jasmine.createSpyObj('FluxoCaixaService', [
      'getResumoFluxoCaixa',
    ]);

    await TestBed.configureTestingModule({
      declarations: [FluxoCaixaResumoComponent, MockCurrencyConverterPipe],
      providers: [
        { provide: FluxoCaixaService, useValue: fluxoCaixaServiceSpy },
      ],
    }).compileComponents();

    fluxoCaixaService = TestBed.inject(
      FluxoCaixaService,
    ) as jasmine.SpyObj<FluxoCaixaService>;
    fluxoCaixaService.getResumoFluxoCaixa.and.returnValue(of([] as any));

    fixture = TestBed.createComponent(FluxoCaixaResumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getResumoFluxoCaixa on initialization', () => {
    expect(fluxoCaixaService.getResumoFluxoCaixa).toHaveBeenCalled();
  });

  it('should have resumoFluxoCaixa$ as an observable', () => {
    expect(component.resumoFluxoCaixa$).toBeTruthy();
    component.resumoFluxoCaixa$.subscribe((data) => {
      expect(data).toEqual([] as any);
    });
  });
});
