import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, NgIf], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private readonly EMAIL_SALVO = 'admin@porteiro.com';
  private readonly SENHA_SALVA = '123456';

  loginEmail = '';
  loginSenha = '';
  loginErro = '';

  constructor(private router: Router) {}

  onSubmit(): void {
    this.loginErro = '';
    const email = this.loginEmail.trim();
    const senha = this.loginSenha.trim();

    if (!email || !senha) {
      this.loginErro = 'Preencha e-mail e senha.';
      return;
    }

    if (email === this.EMAIL_SALVO && senha === this.SENHA_SALVA) {
      this.router.navigate(['/dashboard']);
    } else {
      this.loginErro = 'E-mail ou senha incorretos!';
    }
  }
}
