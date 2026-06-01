import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { ProdutoRemoverComponent } from '../produto-remover/produto-remover';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-listar',
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule, ProdutoRemoverComponent],
  templateUrl: './produto-listar.html'
})
export class ProdutoListarComponent {
  readonly produtoService = inject(ProdutoService);

  editar(id: number) {
    this.produtoService.selecionarParaEdicao(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  detalhar(id: number) {
    this.produtoService.detalhar(id);
  }
}