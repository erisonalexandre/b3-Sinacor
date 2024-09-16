import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import { FluxoCaixaFormComponent } from './fluxo-caixa-form.component';
import { FluxoCaixaService } from '@app/core/services/fluxo-caixa/fluxo-caixa.service';
import {
  TipoTransacaoFluxoCaixaEnum,
  TransacaoFluxoCaixa,
} from '@models/fluxo-caixa.model';

describe('FluxoCaixaFormComponent', () => {
  let component: FluxoCaixaFormComponent;
  let fixture: ComponentFixture<FluxoCaixaFormComponent>;
  let fluxoCaixaService: jasmine.SpyObj<FluxoCaixaService>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<FluxoCaixaFormComponent>>;

  beforeEach(async () => {
    const fluxoCaixaServiceSpy = jasmine.createSpyObj('FluxoCaixaService', [
      'atualizarFluxoCaixa',
      'salvarFluxoCaixa',
    ]);
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      declarations: [FluxoCaixaFormComponent],
      imports: [ReactiveFormsModule, MatDialogModule],
      providers: [
        { provide: FluxoCaixaService, useValue: fluxoCaixaServiceSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: null },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FluxoCaixaFormComponent);
    component = fixture.componentInstance;
    fluxoCaixaService = TestBed.inject(
      FluxoCaixaService,
    ) as jasmine.SpyObj<FluxoCaixaService>;
    dialogRef = TestBed.inject(MatDialogRef) as jasmine.SpyObj<
      MatDialogRef<FluxoCaixaFormComponent>
    >;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.form.value).toEqual({
      descricao: '',
      valor: 0,
      data: jasmine.any(Date),
      tipo: TipoTransacaoFluxoCaixaEnum.ENTRADA,
    });
  });

  it('should patch form values if data is provided', () => {
    const data: TransacaoFluxoCaixa = {
      id: '1',
      descricao: 'Test',
      valor: 100,
      data: new Date(),
      tipo: TipoTransacaoFluxoCaixaEnum.SAIDA,
    };
    component = new FluxoCaixaFormComponent(
      component.fb,
      dialogRef,
      fluxoCaixaService,
      data,
    );
    expect(component.form.value).toEqual({
      descricao: 'Test',
      valor: 100,
      data: data.data,
      tipo: TipoTransacaoFluxoCaixaEnum.SAIDA,
    });
  });

  it('should not save if form is invalid', () => {
    component.form.controls['descricao'].setValue('');
    component.salvar();
    expect(fluxoCaixaService.salvarFluxoCaixa).not.toHaveBeenCalled();
    expect(fluxoCaixaService.atualizarFluxoCaixa).not.toHaveBeenCalled();
  });

  it('should call salvarFluxoCaixa if form is valid and no transacaoFluxoCaixa is provided', () => {
    component.form.controls['descricao'].setValue('Test');
    component.form.controls['valor'].setValue(100);
    component.form.controls['data'].setValue(new Date());
    component.form.controls['tipo'].setValue(
      TipoTransacaoFluxoCaixaEnum.ENTRADA,
    );

    fluxoCaixaService.salvarFluxoCaixa.and.returnValue(
      Promise.resolve({} as TransacaoFluxoCaixa),
    );

    component.salvar();

    expect(fluxoCaixaService.salvarFluxoCaixa).toHaveBeenCalled();
    expect(fluxoCaixaService.atualizarFluxoCaixa).not.toHaveBeenCalled();
  });

  it('should call atualizarFluxoCaixa if form is valid and transacaoFluxoCaixa is provided', () => {
    const data: TransacaoFluxoCaixa = {
      id: '1',
      descricao: 'Test',
      valor: 100,
      data: new Date(),
      tipo: TipoTransacaoFluxoCaixaEnum.SAIDA,
    };
    component = new FluxoCaixaFormComponent(
      component.fb,
      dialogRef,
      fluxoCaixaService,
      data,
    );

    component.form.controls['descricao'].setValue('Updated Test');
    fluxoCaixaService.atualizarFluxoCaixa.and.returnValue(
      Promise.resolve({} as TransacaoFluxoCaixa),
    );

    component.salvar();

    expect(fluxoCaixaService.atualizarFluxoCaixa).toHaveBeenCalledWith(
      data.id,
      jasmine.any(Object),
    );
    expect(fluxoCaixaService.salvarFluxoCaixa).not.toHaveBeenCalled();
  });
});
