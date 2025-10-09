import { Injectable, signal, computed, WritableSignal} from '@angular/core';
import { Entrega } from '../model/entrega.model';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  // Signals para gerencia o estado de forma reativa
  private entregasAtivasSignal: WritableSignal<Entrega[]> = signal([]);
  private historicoSignal: WritableSignal<Entrega[]> = signal([]);
  // Signals públicos e computados para os componentes usarem
  public readonly entregasAtivas = this.entregasAtivasSignal.asReadonly();
  public readonly historico = this.historicoSignal.asReadonly();
  public readonly totalEntregas = computed(() => this.entregasAtivas().length + this.historico().length);
  public readonly totalPendentes = computed(() => this.entregasAtivas().filter(e => e.status === 'pendente').length);
  public readonly totalNotificados = computed(() => this.entregasAtivas().filter(e => e.status === 'notificado').length);
  public readonly totalRetirados = computed(() => this.historico().length);

  constructor() {
    this.carregarDadosDoLocalStorage();
  }

  private carregarDadosDoLocalStorage(): void {
    const ativas = JSON.parse(localStorage.getItem('entregas') || '[]') as Entrega[];
    const historico = JSON.parse(localStorage.getItem('historicoRetiradas') || '[]') as Entrega[];
    this.entregasAtivasSignal.set(ativas);
    this.historicoSignal.set(historico);
  }

  private salvarEntregasAtivas(): void {
    localStorage.setItem('entregas', JSON.stringify(this.entregasAtivasSignal()));
  }

  private salvarHistorico(): void {
    localStorage.setItem('historicoRetiradas', JSON.stringify(this.historicoSignal()));
  }

  addEntrega(novaEntrega: Omit<Entrega, 'id' | 'data' | 'status'>): void {
    const id = this.entregasAtivas().length > 0 ? Math.max(...this.entregasAtivas().map(e => e.id)) + 1 : 1;
    
    const entrega: Entrega = {
      ...novaEntrega,
      id,
      data: new Date().toLocaleString('pt-BR'),
      status: 'pendente'
    };

    this.entregasAtivasSignal.update(entregas => [entrega, ...entregas]);
    this.salvarEntregasAtivas();
  }

  atualizarStatus(id: number, novoStatus: 'notificado' | 'retirado'): void {
    if (novoStatus === 'retirado') {
      const entregaParaMover = this.entregasAtivas().find(e => e.id === id);
      if (entregaParaMover) {
        // Remove da lista de ativas
        this.entregasAtivasSignal.update(entregas => entregas.filter(e => e.id !== id));
        // Adiciona ao histórico
        this.historicoSignal.update(historico => [{ ...entregaParaMover, status: 'retirado' }, ...historico]); 
        this.salvarEntregasAtivas();
        this.salvarHistorico();
      }
    } else {
      // Atualiza o status na lista de ativas
      this.entregasAtivasSignal.update(entregas => 
        entregas.map(e => e.id === id ? { ...e, status: novoStatus } : e)
      );
      this.salvarEntregasAtivas();
    }
  }

  limparHistorico(): void {
    this.historicoSignal.set([]);
    localStorage.removeItem('historicoRetiradas');
  }
}
