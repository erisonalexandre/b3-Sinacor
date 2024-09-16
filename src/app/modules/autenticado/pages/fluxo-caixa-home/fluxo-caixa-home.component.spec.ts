import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FluxoCaixaHomeComponent } from './fluxo-caixa-home.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fluxo-caixa-resumo',
  template: '',
})
class MockFluxoCaixaResumoComponent {}

@Component({
  selector: 'app-fluxo-caixa-lista',
  template: '',
})
class MockFluxoCaixaListaComponent {}

describe('FluxoCaixaHomeComponent', () => {
  let component: FluxoCaixaHomeComponent;
  let fixture: ComponentFixture<FluxoCaixaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FluxoCaixaHomeComponent,
        MockFluxoCaixaResumoComponent,
        MockFluxoCaixaListaComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoCaixaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
