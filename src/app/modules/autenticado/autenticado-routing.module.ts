import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FluxoCaixaHomeComponent } from './pages/fluxo-caixa-home/fluxo-caixa-home.component';
import { ContainerComponent } from '@layout/container/container.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerComponent,
    children: [
      {
        path: '',
        redirectTo: 'fluxo-caixa',
        pathMatch: 'full',
      },
      {
        path: 'fluxo-caixa',
        component: FluxoCaixaHomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutenticadoRoutingModule {}
