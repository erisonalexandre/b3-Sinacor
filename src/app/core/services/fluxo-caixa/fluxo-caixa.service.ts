import { removeEmpty } from '@utils/removeEmpty';
import { Injectable } from '@angular/core';
import {
  ResumoFluxoCaixa,
  TipoTransacaoFluxoCaixaEnum,
  TransacaoFluxoCaixa,
  TransacaoFluxoCaixaRequest,
} from '@models/fluxo-caixa.model';
import {
  Firestore,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FluxoCaixaService {
  private transacaoFluxoCaixa: TransacaoFluxoCaixa[] = [];
  private dataFiltro: Date = new Date();

  private resumoFluxoCaixa = new BehaviorSubject(new ResumoFluxoCaixa(0, 0, 0));

  constructor(
    private firestore: Firestore,
    private auth: Auth,
  ) {}

  async salvarFluxoCaixa(fluxoCaixa: TransacaoFluxoCaixaRequest) {
    const doc = await addDoc(
      collection(this.firestore, 'fluxoCaixa'),
      removeEmpty({
        ...fluxoCaixa,
        data: fluxoCaixa.data.getTime(),
        uid: this.auth.currentUser?.uid,
      }),
    );

    const transacao = new TransacaoFluxoCaixa(
      doc.id,
      fluxoCaixa.data,
      fluxoCaixa.descricao,
      fluxoCaixa.valor,
      fluxoCaixa.tipo,
    );

    if (
      moment(transacao.data).format('MM-YYYY') ===
      moment(this.dataFiltro).format('MM-YYYY')
    ) {
      this.transacaoFluxoCaixa.push(transacao);
    }

    return transacao;
  }

  async atualizarFluxoCaixa(
    id: string,
    fluxoCaixa: TransacaoFluxoCaixaRequest,
  ) {
    const docRef = doc(this.firestore, 'fluxoCaixa', id);

    await updateDoc(
      docRef,
      removeEmpty({
        ...fluxoCaixa,
        data: fluxoCaixa.data.getTime(),
        uid: this.auth.currentUser?.uid,
      }),
    );

    const transacao = new TransacaoFluxoCaixa(
      id,
      fluxoCaixa.data,
      fluxoCaixa.descricao,
      fluxoCaixa.valor,
      fluxoCaixa.tipo,
    );

    this.transacaoFluxoCaixa = this.transacaoFluxoCaixa.map((item) => {
      if (item.id === transacao.id) {
        return transacao;
      }
      return item;
    });

    return transacao;
  }

  async excluirFluxoCaixa(id: string) {
    const docRef = doc(this.firestore, 'fluxoCaixa', id);
    await deleteDoc(docRef);

    this.transacaoFluxoCaixa = this.transacaoFluxoCaixa.filter(
      (item) => item.id !== id,
    );

    return true;
  }

  async listarFluxoCaixa(filtroMesAno: Date) {
    const uid = this.auth.currentUser?.uid;
    if (this.dataFiltro === filtroMesAno) {
      this.calcularResumoFluxoCaixa();
      return this.transacaoFluxoCaixa;
    }

    this.dataFiltro = filtroMesAno;
    const fluxoCaixaCollection = collection(this.firestore, 'fluxoCaixa');

    const startOfMonth = new Date(
      filtroMesAno.getFullYear(),
      filtroMesAno.getMonth(),
      1,
    ).getTime();
    const endOfMonth = new Date(
      filtroMesAno.getFullYear(),
      filtroMesAno.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    ).getTime();

    // Aplica o filtro de milissegundos
    const queryRef = query(
      fluxoCaixaCollection,
      where('uid', '==', uid),
      where('data', '>=', startOfMonth),
      where('data', '<=', endOfMonth),
    );

    const querySnapshot = await getDocs(queryRef);
    const fluxoCaixaList: TransacaoFluxoCaixa[] = [];

    querySnapshot.forEach((doc) => {
      const fluxoCaixa = TransacaoFluxoCaixa.fromJson({
        id: doc.id,
        ...doc.data(),
      });
      fluxoCaixaList.push(fluxoCaixa);
    });

    this.transacaoFluxoCaixa = fluxoCaixaList;
    this.calcularResumoFluxoCaixa();
    return this.transacaoFluxoCaixa;
  }

  private calcularResumoFluxoCaixa() {
    const resumo = this.transacaoFluxoCaixa.reduce(
      (acc, item) => {
        if (item.tipo === TipoTransacaoFluxoCaixaEnum.ENTRADA) {
          acc.totalEntrada += item.valor;
        } else {
          acc.totalSaida += item.valor;
        }

        acc.saldo = acc.totalEntrada - acc.totalSaida;

        return acc;
      },
      new ResumoFluxoCaixa(0, 0, 0),
    );

    this.resumoFluxoCaixa.next(resumo);
  }

  getResumoFluxoCaixa() {
    return this.resumoFluxoCaixa.asObservable();
  }
}
