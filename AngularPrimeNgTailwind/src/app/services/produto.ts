import { computed, Injectable, signal } from '@angular/core';

import { Produto } from '../models/produto';

export type ProdutoSemId = Omit<Produto, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly produtosState = signal<Produto[]>([]);

  readonly produtos = this.produtosState.asReadonly();
  readonly produtoEditando = signal<Produto | null>(null);
  readonly produtoDetalhado = signal<Produto | null>(null);

  readonly totalProdutos = computed(() => this.produtos().length);
  readonly totalAtivos = computed(() => this.produtos().filter(produto => produto.ativo).length);
  readonly valorTotal = computed(() =>
    this.produtos().reduce((acc, produto) => acc + produto.preco, 0).toFixed(2)
  );

  listar(): Produto[] {
    return this.produtos();
  }

  inserir(produto: ProdutoSemId): Produto {
    const novoProduto: Produto = {
      ...produto,
      id: Date.now()
    };

    this.produtosState.update(produtos => [...produtos, novoProduto]);

    return novoProduto;
  }

  atualizar(produtoAtualizado: Produto): Produto | null {
    const produtoExiste = this.produtos().some(produto => produto.id === produtoAtualizado.id);

    if (!produtoExiste) {
      return null;
    }

    this.produtosState.update(produtos =>
      produtos.map(produto => (produto.id === produtoAtualizado.id ? produtoAtualizado : produto))
    );

    if (this.produtoDetalhado()?.id === produtoAtualizado.id) {
      this.produtoDetalhado.set(produtoAtualizado);
    }

    this.produtoEditando.set(null);

    return produtoAtualizado;
  }

  detalhar(id: number): Produto | null {
    const produto = this.produtos().find(produtoAtual => produtoAtual.id === id) ?? null;
    this.definirProdutoDetalhado(produto);

    return produto;
  }

  definirProdutoDetalhado(produto: Produto | null) {
    this.produtoDetalhado.set(produto ? { ...produto } : null);
  }

  selecionarParaEdicao(id: number): Produto | null {
    const produto = this.produtos().find(produtoAtual => produtoAtual.id === id) ?? null;
    this.definirProdutoEditando(produto);

    return produto;
  }

  definirProdutoEditando(produto: Produto | null) {
    this.produtoEditando.set(produto ? { ...produto } : null);
  }

  cancelarEdicao() {
    this.produtoEditando.set(null);
  }

  fecharDetalhes() {
    this.produtoDetalhado.set(null);
  }

  remover(id: number): boolean {
    const produtoExiste = this.produtos().some(produto => produto.id === id);

    if (!produtoExiste) {
      return false;
    }

    this.produtosState.update(produtos => produtos.filter(produto => produto.id !== id));

    if (this.produtoDetalhado()?.id === id) {
      this.produtoDetalhado.set(null);
    }

    if (this.produtoEditando()?.id === id) {
      this.produtoEditando.set(null);
    }

    return true;
  }
}