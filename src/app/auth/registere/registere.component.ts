import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registere',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './registere.component.html',
  styleUrls: ['./registere.component.css']
})
export class RegistereComponent {
  nome = '';
  email = '';
  senha = '';
  termos = false;

  constructor(private router: Router) {}

  cadastrar() {
    if (!this.termos) {
      alert('Você precisa aceitar os Termos e a Política de Privacidade.');
      return;
    }

    alert('Cadastro realizado com sucesso.');
    this.router.navigate(['/login']);
  }
}
