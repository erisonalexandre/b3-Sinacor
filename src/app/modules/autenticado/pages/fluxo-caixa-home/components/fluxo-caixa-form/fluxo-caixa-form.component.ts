import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FluxoCaixaService } from '@app/core/services/fluxo-caixa/fluxo-caixa.service';
import {
  TipoTransacaoFluxoCaixaEnum,
  TransacaoFluxoCaixa,
} from '@models/fluxo-caixa.model';

@Component({
  selector: 'app-fluxo-caixa-form',
  templateUrl: './fluxo-caixa-form.component.html',
  styleUrls: ['./fluxo-caixa-form.component.scss'],
})
export class FluxoCaixaFormComponent {
  transacaoFluxoCaixa?: TransacaoFluxoCaixa;
  form = this.fb.nonNullable.group({
    descricao: this.fb.nonNullable.control('', Validators.required),
    valor: this.fb.nonNullable.control(0, Validators.required),
    data: this.fb.nonNullable.control(new Date(), Validators.required),
    tipo: this.fb.nonNullable.control<TipoTransacaoFluxoCaixaEnum>(
      TipoTransacaoFluxoCaixaEnum.ENTRADA,
      Validators.required,
    ),
  });

  tipos: string[] = ['Entrada', 'Saída'];

  constructor(
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<FluxoCaixaFormComponent>,
    public fluxoCaixaService: FluxoCaixaService,
    @Inject(MAT_DIALOG_DATA) public data?: TransacaoFluxoCaixa,
  ) {
    this.transacaoFluxoCaixa = data;
    if (this.transacaoFluxoCaixa) {
      this.form.patchValue(this.transacaoFluxoCaixa);
    }
  }

  salvar() {
    if (this.form.invalid) {
      return;
    }

    const formRawValue = this.form.getRawValue();
    if (this.transacaoFluxoCaixa) {
      this.fluxoCaixaService
        .atualizarFluxoCaixa(this.transacaoFluxoCaixa.id, {
          data: formRawValue.data,
          descricao: formRawValue.descricao,
          valor: formRawValue.valor,
          tipo: formRawValue.tipo,
        })
        .then((res) => this.dialogRef.close(res));
    } else {
      this.fluxoCaixaService
        .salvarFluxoCaixa({
          data: formRawValue.data,
          descricao: formRawValue.descricao,
          valor: formRawValue.valor,
          tipo: formRawValue.tipo,
        })
        .then((res) => this.dialogRef.close(res));
    }
  }
}
