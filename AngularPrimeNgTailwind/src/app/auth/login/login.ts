import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, FormsModule, InputTextModule, PasswordModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly username = signal('admin');
  readonly password = signal('admin123');
  readonly carregando = signal(false);

  entrar() {
    if (!this.username() || !this.password()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Atenção',
        detail: 'Informe usuário e senha.'
      });
      return;
    }

    this.carregando.set(true);

    this.authService
      .login({
        username: this.username(),
        password: this.password()
      })
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Bem-vindo',
            detail: 'Login realizado com sucesso!'
          });

          this.router.navigate(['/produtos']);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Login inválido',
            detail: 'Usuário ou senha incorretos.'
          });
          this.carregando.set(false);
        },
        complete: () => this.carregando.set(false)
      });
  }
}