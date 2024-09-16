import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { FluxoCaixaListaComponent } from './fluxo-caixa-lista.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { FluxoCaixaService } from '@app/core/services/fluxo-caixa/fluxo-caixa.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { TransacaoFluxoCaixa } from '@app/core/models/fluxo-caixa.model';
import { InputDateMonthComponent } from '@app/shared/components/input-date-month/input-date-month.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

describe('FluxoCaixaListaComponent', () => {
  let component: FluxoCaixaListaComponent;
  let fixture: ComponentFixture<FluxoCaixaListaComponent>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockFluxoCaixaService: jasmine.SpyObj<FluxoCaixaService>;
  let mockToastrService: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockFluxoCaixaService = jasmine.createSpyObj('FluxoCaixaService', [
      'listarFluxoCaixa',
      'excluirFluxoCaixa',
    ]);
    mockToastrService = jasmine.createSpyObj('ToastrService', ['success']);
    const mockData = [] as TransacaoFluxoCaixa[];
    mockFluxoCaixaService.listarFluxoCaixa.and.returnValue(
      Promise.resolve(mockData),
    );

    await TestBed.configureTestingModule({
      declarations: [FluxoCaixaListaComponent, InputDateMonthComponent],
      imports: [
        MatTableModule,
        ReactiveFormsModule,
        FormsModule,
        NoopAnimationsModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule,
      ],
      providers: [
        { provide: MatDialog, useValue: mockDialog },
        { provide: FluxoCaixaService, useValue: mockFluxoCaixaService },
        FormBuilder,
        { provide: ToastrService, useValue: mockToastrService },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FluxoCaixaListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init', () => {
    const mockData = [{ id: 1, descricao: 'Test' }] as any;
    mockFluxoCaixaService.listarFluxoCaixa.and.returnValue(
      Promise.resolve(mockData),
    );

    component.ngOnInit();

    expect(mockFluxoCaixaService.listarFluxoCaixa).toHaveBeenCalled();
  });

  it('should call carregarDados when dataFiltro value changes', () => {
    spyOn(component, 'carregarDados');
    component.ngOnInit();
    component.dataFiltro.setValue(new Date());

    expect(component.carregarDados).toHaveBeenCalled();
  });

  it('should open dialog and reload data on edit', () => {
    const mockFluxoCaixa = { id: 1, descricao: 'Test' } as any;
    mockDialog.open.and.returnValue({
      afterClosed: () => of(true),
    } as any);

    spyOn(component, 'carregarDados');

    component.editar(mockFluxoCaixa);

    expect(mockDialog.open).toHaveBeenCalled();
    expect(component.carregarDados).toHaveBeenCalled();
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Transação editada com sucesso!',
    );
  });

  it('should open confirm dialog and delete item on excluir', fakeAsync(() => {
    const mockFluxoCaixa = { id: 1, descricao: 'Test' } as any;
    mockDialog.open.and.returnValue({
      afterClosed: () => of(true),
    } as any);
    mockFluxoCaixaService.excluirFluxoCaixa.and.returnValue(
      Promise.resolve(true),
    );

    spyOn(component, 'carregarDados');

    component.excluir(mockFluxoCaixa);

    tick();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(mockFluxoCaixaService.excluirFluxoCaixa).toHaveBeenCalledWith(
      mockFluxoCaixa.id,
    );
    expect(component.carregarDados).toHaveBeenCalled();
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Transação excluída com sucesso!',
    );
  }));

  it('should open dialog and reload data on cadastrar', () => {
    mockDialog.open.and.returnValue({
      afterClosed: () => of(true),
    } as any);

    spyOn(component, 'carregarDados');

    component.cadastrar();

    expect(mockDialog.open).toHaveBeenCalled();
    expect(component.carregarDados).toHaveBeenCalled();
    expect(mockToastrService.success).toHaveBeenCalledWith(
      'Transação cadastrada com sucesso!',
    );
  });
});
