export class TransacaoFluxoCaixa {
  constructor(
    public id: string,
    public data: Date,
    public descricao: string,
    public valor: number,
    public tipo: TipoTransacaoFluxoCaixaEnum,
  ) {}

  static fromJson(data: any): TransacaoFluxoCaixa {
    return new TransacaoFluxoCaixa(
      data.id,
      new Date(data.data),
      data.descricao,
      data.valor,
      data.tipo,
    );
  }
}

export interface TransacaoFluxoCaixaRequest {
  data: Date;
  descricao: string;
  valor: number;
  tipo: TipoTransacaoFluxoCaixaEnum;
}

export class TransacaoFluxoCaixaFilter {
  constructor(
    public dataInicio: Date,
    public dataFim: Date,
    public descricao: string,
    public tipo: TipoTransacaoFluxoCaixaEnum,
  ) {}

  static fromJson(data: any): TransacaoFluxoCaixaFilter {
    return new TransacaoFluxoCaixaFilter(
      new Date(data.dataInicio),
      new Date(data.dataFim),
      data.descricao,
      data.tipo,
    );
  }

  static toJson(filter: TransacaoFluxoCaixaFilter) {
    return {
      dataInicio: filter.dataInicio,
      dataFim: filter.dataFim,
      descricao: filter.descricao,
      tipo: filter.tipo,
    };
  }
}

export class ResumoFluxoCaixa {
  constructor(
    public totalEntrada: number,
    public totalSaida: number,
    public saldo: number,
  ) {}

  static fromJson(data: any): ResumoFluxoCaixa {
    return new ResumoFluxoCaixa(data.totalEntrada, data.totalSaida, data.saldo);
  }
}

export enum TipoTransacaoFluxoCaixaEnum {
  ENTRADA = 'Entrada',
  SAIDA = 'Saída',
}
