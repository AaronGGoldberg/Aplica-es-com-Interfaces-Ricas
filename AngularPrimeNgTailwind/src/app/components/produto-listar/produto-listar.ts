import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { Produto } from '../../models/produto';
import { ProdutoRemoverComponent } from '../produto-remover/produto-remover';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-listar',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    RouterLink,
    TableModule,
    ProdutoRemoverComponent
  ],
  templateUrl: './produto-listar.html'
})
export class ProdutoListarComponent {
  readonly produtoService = inject(ProdutoService);

  private readonly router = inject(Router);

  editar(produto: Produto) {
    this.router.navigate([
      '/produtos',
      produto.id,
      'editar'
    ]);
  }

  detalhar(produto: Produto) {
    this.router.navigate([
      '/produtos',
      produto.id,
      'detalhar'
    ]);
  }
}