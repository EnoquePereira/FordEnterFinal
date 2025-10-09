import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Entrega } from '../../../core/model/entrega.model';
import { FormBuilder, FormGroup, Validators,  ReactiveFormsModule, FormsModule} from '@angular/forms';

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent implements OnInit {
 private fb = inject(FormBuilder);

  // Recebe do componente pai se o modal deve estar visível
  @Input() isOpen: boolean = false;

  // Emite eventos para o componente pai
  @Output() closeModal = new EventEmitter<void>();
  @Output() addEntrega = new EventEmitter<Omit<Entrega, 'id' | 'data' | 'status'>>();

  // O FormGroup que vai gerenciar o formulário
  entregaForm!: FormGroup;

  ngOnInit(): void {
    this.entregaForm = this.fb.group({
      apto: ['', Validators.required],
      morador: ['', Validators.required],
      tipo: ['Encomenda', Validators.required], // Valor padrão
      remetente: ['', Validators.required],
      desc: ['', Validators.required],
      obs: ['']
    });
  }

  // Atualiza o valor do campo "tipo" no formulário
  selecionarTipo(tipo: string): void {
    this.entregaForm.get('tipo')?.setValue(tipo);
  }

  // Emite o evento para o pai fechar o modal
  onClose(): void {
    this.closeModal.emit();
    this.entregaForm.reset({ tipo: 'Encomenda' });
  }

  // Valida e emite os dados do formulário para o pai
  onSubmit(): void {
    if (this.entregaForm.invalid) {
      this.entregaForm.markAllAsTouched(); // Mostra erros de validação
      alert("Preencha os campos obrigatórios!");
      return;
    }

    const formValue = this.entregaForm.value;
    const novaEntrega = {
      apto: formValue.apto,
      morador: formValue.morador,
      remetente: formValue.remetente,
      tipo: formValue.tipo,
      desc: formValue.obs ? `${formValue.desc} — ${formValue.obs}` : formValue.desc,
    };

    this.addEntrega.emit(novaEntrega);
    this.onClose();
  }
}

