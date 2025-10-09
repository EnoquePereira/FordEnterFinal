import { Component, inject, computed, signal } from '@angular/core';
import { EntregaService } from '../../../core/service/entrega.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule
  ], // Importa FormsModule para o filtro
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export class HistoricoComponent {
  private entregaService = inject(EntregaService);

  // input de busca
  filtroTermo = signal('');

  //filtra o histórico automaticamente
  historicoFiltrado = computed(() => {
    const termo = this.filtroTermo().toLowerCase().trim();
    const historicoCompleto = this.entregaService.historico();

    if (!termo) {
      return historicoCompleto; // Retorna tudo se não houver filtro
    }

    return historicoCompleto.filter(ent => 
      ent.morador.toLowerCase().includes(termo) ||
      ent.apto.toLowerCase().includes(termo) ||
      ent.desc.toLowerCase().includes(termo) ||
      ent.remetente.toLowerCase().includes(termo)
    );
  });

  limparHistorico(): void {
    const confirmacao = confirm(
      "Tem certeza que deseja apagar TODO o histórico de retiradas? Esta ação não pode ser desfeita."
    );

    if (confirmacao) {
      this.entregaService.limparHistorico();
      alert("Histórico apagado com sucesso!");
    }
  }
}