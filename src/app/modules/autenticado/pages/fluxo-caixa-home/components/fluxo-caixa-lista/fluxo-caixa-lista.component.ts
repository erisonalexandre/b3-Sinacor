import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import {
  TransacaoFluxoCaixa,
  TipoTransacaoFluxoCaixaEnum,
} from '@models/fluxo-caixa.model';
import { FluxoCaixaFormComponent } from '../fluxo-caixa-form/fluxo-caixa-form.component';
import { FluxoCaixaService } from '@app/core/services/fluxo-caixa/fluxo-caixa.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogComponent } from '@app/shared/components/confirm-dialog/confirm-dialog.component';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-fluxo-caixa-lista',
  templateUrl: './fluxo-caixa-lista.component.html',
  styleUrls: ['./fluxo-caixa-lista.component.scss'],
})
export class FluxoCaixaListaComponent implements OnInit {
  dataSource = new MatTableDataSource<TransacaoFluxoCaixa>();
  displayedColumns: string[] = [
    'data',
    'descricao',
    'valorEntrada',
    'valorSaida',
    'acao',
  ];
  tipoTransacaoFluxoCaixaEnum = TipoTransacaoFluxoCaixaEnum;
  dataFiltro = this.fb.nonNullable.control(new Date());

  constructor(
    public dialog: MatDialog,
    public fluxoCaixaService: FluxoCaixaService,
    public fb: FormBuilder,
    public toastrService: ToastrService,
  ) {}

  ngOnInit() {
    this.carregarDados();
    this.dataFiltro.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.carregarDados();
    });
  }

  carregarDados() {
    this.fluxoCaixaService
      .listarFluxoCaixa(this.dataFiltro.value)
      .then((data) => {
        this.dataSource.data = data;
      });
  }

  editar(fluxoCaixa: TransacaoFluxoCaixa) {
    const dialogRef = this.dialog.open(FluxoCaixaFormComponent, {
      data: fluxoCaixa,
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.carregarDados();
      this.toastrService.success('Transação editada com sucesso!');
    });
  }

  excluir(fluxoCaixa: TransacaoFluxoCaixa) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Deseja realmente excluir esta transação?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.fluxoCaixaService.excluirFluxoCaixa(fluxoCaixa.id).then((res) => {
        if (res) {
          this.carregarDados();
          this.toastrService.success('Transação excluída com sucesso!');
        }
      });
    });
  }

  cadastrar() {
    const dialogRef = this.dialog.open(FluxoCaixaFormComponent, {
      width: '450px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      this.carregarDados();
      this.toastrService.success('Transação cadastrada com sucesso!');
    });
  }
}
