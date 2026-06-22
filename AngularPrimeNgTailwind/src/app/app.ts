import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { AuthService } from './auth/auth.service';
import { ProdutoService } from './services/produto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ToastModule],
  providers: [MessageService],
  templateUrl: './app.html'
})
export class App {
  readonly authService = inject(AuthService);  
  readonly produtoService = inject(ProdutoService);

  private readonly router = inject(Router);

  sair() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }  
}