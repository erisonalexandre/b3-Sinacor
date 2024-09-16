import { Component } from '@angular/core';
import { FluxoCaixaService } from '@services/fluxo-caixa/fluxo-caixa.service';

@Component({
  selector: 'app-fluxo-caixa-resumo',
  templateUrl: './fluxo-caixa-resumo.component.html',
  styleUrls: ['./fluxo-caixa-resumo.component.scss'],
})
export class FluxoCaixaResumoComponent {
  resumoFluxoCaixa$ = this.fluxoCaixaService.getResumoFluxoCaixa();

  constructor(public fluxoCaixaService: FluxoCaixaService) {}
}
