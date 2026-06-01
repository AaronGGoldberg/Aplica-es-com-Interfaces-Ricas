import { Component, inject, input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';

import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-remover',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './produto-remover.html'
})
export class ProdutoRemoverComponent {
  readonly produto = input.required<Produto>();

  private readonly messageService = inject(MessageService);
  private readonly produtoService = inject(ProdutoService);

  remover() {
    const produtoRemovido = this.produtoService.remover(this.produto().id);

    if (!produtoRemovido) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Produto não encontrado para remoção.'
      });

      return;
    }

    this.messageService.add({
      severity: 'warn',
      summary: 'Removido',
      detail: 'Produto excluído'
    });
  }
}