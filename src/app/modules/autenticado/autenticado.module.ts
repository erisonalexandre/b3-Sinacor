import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutenticadoRoutingModule } from './autenticado-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { FluxoCaixaHomeComponent } from './pages/fluxo-caixa-home/fluxo-caixa-home.component';
import { FluxoCaixaListaComponent } from './pages/fluxo-caixa-home/components/fluxo-caixa-lista/fluxo-caixa-lista.component';
import { FluxoCaixaResumoComponent } from './pages/fluxo-caixa-home/components/fluxo-caixa-resumo/fluxo-caixa-resumo.component';
import { FluxoCaixaFormComponent } from './pages/fluxo-caixa-home/components/fluxo-caixa-form/fluxo-caixa-form.component';

@NgModule({
  imports: [CommonModule, AutenticadoRoutingModule, SharedModule],
  declarations: [
    FluxoCaixaHomeComponent,
    FluxoCaixaListaComponent,
    FluxoCaixaResumoComponent,
    FluxoCaixaFormComponent,
  ],
})
export class AutenticadoModule {}
