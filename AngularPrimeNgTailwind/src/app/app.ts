import { Component, computed, signal } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ProdutoAlterarComponent } from './components/produto-alterar/produto-alterar';
import { ProdutoDetalharComponent } from './components/produto-detalhar/produto-detalhar';
import { ProdutoIncluirComponent } from './components/produto-incluir/produto-incluir';
import { ProdutoListarComponent } from './components/produto-listar/produto-listar';
import { Produto } from './models/produto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ToastModule,
    ProdutoAlterarComponent,
    ProdutoDetalharComponent,
    ProdutoIncluirComponent,
    ProdutoListarComponent
  ],
  providers: [MessageService],
  templateUrl: './app.html'
})
export class App {
  readonly produtos = signal<Produto[]>([]);
  readonly produtoEditando = signal<Produto | null>(null);
  readonly produtoSelecionado = signal<Produto | null>(null);

  readonly totalProdutos = computed(() => this.produtos().length);

  readonly totalAtivos = computed(() =>
    this.produtos().filter(produto => produto.ativo).length
  );

  readonly valorTotal = computed(() =>
    this.produtos().reduce((acc, produto) => acc + produto.preco, 0).toFixed(2)
  );

  constructor(private messageService: MessageService) {}

  incluir(produto: Produto) {
    this.produtos.update(produtos => [...produtos, produto]);
    this.messageService.add({
      severity: 'success',
      summary: 'Criado',
      detail: 'Produto adicionado!'
    });
  }

  selecionarParaEdicao(produto: Produto) {
    this.produtoEditando.set({ ...produto });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  alterar(produtoAtualizado: Produto) {
    this.produtos.update(produtos =>
      produtos.map(produto =>
        produto.id === produtoAtualizado.id
          ? produtoAtualizado
          : produto
      )
    );
    if (this.produtoSelecionado()?.id === produtoAtualizado.id) {
      this.produtoSelecionado.set(produtoAtualizado);
    }
    this.produtoEditando.set(null);
    this.messageService.add({
      severity: 'success',
      summary: 'Atualizado',
      detail: 'Produto atualizado com sucesso!'
    });
  }

  cancelarEdicao() {
    this.produtoEditando.set(null);
  }

  remover(produtoRemovido: Produto) {
    this.produtos.update(produtos =>
      produtos.filter(produto => produto.id !== produtoRemovido.id)
    );
    if (this.produtoSelecionado()?.id === produtoRemovido.id) {
      this.produtoSelecionado.set(null);
    }
    if (this.produtoEditando()?.id === produtoRemovido.id) {
      this.produtoEditando.set(null);
    }
    this.messageService.add({
      severity: 'warn',
      summary: 'Removido',
      detail: 'Produto excluído'
    });
  }

  detalhar(produto: Produto) {
    this.produtoSelecionado.set(produto);
  }

  fecharDetalhes() {
    this.produtoSelecionado.set(null);
  }
}