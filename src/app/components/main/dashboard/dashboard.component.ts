import { Component, inject, computed, signal, OnInit  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Entrega } from '../../../core/model/entrega.model';
import { EntregaService } from '../../../core/service/entrega.service';
import { CommonModule } from '@angular/common';
import { EntregaCardComponent } from "../../../shared/components/entrega-card/entrega-card.component";
import { RouterLinkActive, RouterModule } from '@angular/router';
import { ModalComponent } from "../../../shared/components/modal/modal.component";

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    EntregaCardComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLinkActive,
    RouterModule,
    ModalComponent
],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  private entregaService = inject(EntregaService);
  private fb = inject(FormBuilder);

  // filtros (requer FormsModule no app.config ou module)
  filtroNome = signal('');
  filtroStatus = signal('');
  filtroApto = signal('');
  isModalOpen = signal(false);

  // Formulário Reativo para a nova entrega
  entregaForm!: FormGroup;

  //filtra as entregas automaticamente
  entregasFiltradas = computed(() => {
    const nome = this.filtroNome().toLowerCase().trim();
    const status = this.filtroStatus();
    const apto = this.filtroApto().trim();
    
    return this.entregaService.entregasAtivas().filter(ent => 
      (!nome || ent.morador.toLowerCase().includes(nome) || ent.desc.toLowerCase().includes(nome)) &&
      (!status || ent.status === status) &&
      (!apto || ent.apto === apto)
    );
  });
  
  // totais do serviço para o template
  totalEntregas = this.entregaService.totalEntregas;
  totalPendentes = this.entregaService.totalPendentes;
  totalNotificados = this.entregaService.totalNotificados;
  totalRetirados = this.entregaService.totalRetirados;
  
  ngOnInit(): void {
    // Inicializa o formulário
    this.entregaForm = this.fb.group({
      apto: ['', Validators.required],
      morador: ['', Validators.required],
      tipo: ['Encomenda', Validators.required], // Valor padrão
      remetente: ['', Validators.required],
      desc: ['', Validators.required],
      obs: ['']
    });
  }

  handleStatusChange(event: { id: number; novoStatus: 'notificado' | 'retirado' }): void {
    this.entregaService.atualizarStatus(event.id, event.novoStatus);
  }

  // Funções do Modal
  abrirModal(): void {
    this.isModalOpen.set(true);
  }

  fecharModal(): void {
    this.isModalOpen.set(false);
  }
  
  selecionarTipo(tipo: string): void {
    this.entregaForm.get('tipo')?.setValue(tipo);
  }

  handleNovaEntrega(novaEntrega: Omit<Entrega, 'id' | 'data' | 'status'>): void {
    this.entregaService.addEntrega(novaEntrega);
  }

  onSubmit(): void {
    if (this.entregaForm.invalid) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    const formValue = this.entregaForm.value;
    const novaEntrega: Omit<Entrega, 'id' | 'data' | 'status'> = {
        apto: formValue.apto,
        morador: formValue.morador,
        remetente: formValue.remetente,
        tipo: formValue.tipo,
        desc: formValue.obs ? `${formValue.desc} — ${formValue.obs}` : formValue.desc,
    };

    this.entregaService.addEntrega(novaEntrega);
    this.fecharModal();
  }
}
