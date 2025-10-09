import {  Component, Input, Output, EventEmitter } from '@angular/core';
import { Entrega } from '../../../core/model/entrega.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-entrega-card',
  imports: [CommonModule],
  templateUrl: './entrega-card.component.html',
  styleUrl: './entrega-card.component.css'
})
export class EntregaCardComponent {
  @Input({ required: true }) entrega!: Entrega;
  @Output() statusChange = new EventEmitter<{ id: number; novoStatus: 'notificado' | 'retirado' }>();

  onNotificarClick(): void {
    this.statusChange.emit({ id: this.entrega.id, novoStatus: 'notificado' });
  }

  onRetirarClick(): void {
    this.statusChange.emit({ id: this.entrega.id, novoStatus: 'retirado' });
  }
}
