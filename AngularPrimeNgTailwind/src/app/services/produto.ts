import { computed, Injectable, signal } from '@angular/core';

import { Produto } from '../models/produto';

export type ProdutoSemId = Omit<Produto, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly produtosState = signal<Produto[]>([]);

  readonly produtos = this.produtosState.asReadonly();

  readonly totalProdutos = computed(() => this.produtos().length);

  readonly totalAtivos = computed(() =>
    this.produtos().filter(produto => produto.ativo).length
  );

  readonly valorTotal = computed(() =>
    this.produtos()
      .reduce((acc, produto) => acc + produto.preco, 0)
      .toFixed(2)
  );

  listar(): Produto[] {
    return this.produtos();
  }

  buscarPorId(id: number): Produto | null {
    return this.produtos().find(produto => produto.id === id) ?? null;
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
    const produtoExiste = this.buscarPorId(produtoAtualizado.id);

    if (!produtoExiste) {
      return null;
    }

    this.produtosState.update(produtos =>
      produtos.map(produto =>
        produto.id === produtoAtualizado.id
          ? produtoAtualizado
          : produto
      )
    );

    return produtoAtualizado;
  }

  remover(id: number): boolean {
    const produtoExiste = this.buscarPorId(id);

    if (!produtoExiste) {
      return false;
    }

    this.produtosState.update(produtos =>
      produtos.filter(produto => produto.id !== id)
    );

    return true;
  }
}