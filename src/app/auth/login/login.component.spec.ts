import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from "../../../../node_modules/@angular/router/router_module.d-Bx9ArA6K";

@Component({
  selector: 'app-login',
  standalone: true, // use true se estiver usando standalone components
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  private readonly EMAIL_SALVO = 'admin@porteiro.com';
  private readonly SENHA_SALVA = '123456';

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    const formLogin = document.getElementById('formLogin') as HTMLFormElement | null;

    if (formLogin) {
      formLogin.addEventListener('submit', (e: Event) => {
        e.preventDefault();

        const emailInput = document.getElementById('loginEmail') as HTMLInputElement | null;
        const senhaInput = document.getElementById('loginSenha') as HTMLInputElement | null;
        const erroDiv = document.getElementById('loginErro') as HTMLElement | null;

        const email = emailInput?.value.trim() || '';
        const senha = senhaInput?.value.trim() || '';

        if (email === this.EMAIL_SALVO && senha === this.SENHA_SALVA) {
          alert('Login realizado com sucesso!');
          this.router.navigate(['/dashboard']); // redireciona para a página principal
        } else {
          if (erroDiv) erroDiv.textContent = 'E-mail ou senha incorretos!';
        }
      });
    }
  }
}
