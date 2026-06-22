import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Produto } from '../models/produto';

export type ProdutoSemId = Omit<Produto, 'id'>;

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/produtos';
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

  listar(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl).pipe(
      tap(produtos => this.produtosState.set(produtos))
    );
  }

  buscarPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  inserir(produto: ProdutoSemId): Observable<Produto> {
    return this.http.post<Produto>(this.apiUrl, produto).pipe(
      tap(novoProduto =>
        this.produtosState.update(produtos => [...produtos, novoProduto])
      )
    );
  }

  atualizar(produtoAtualizado: Produto): Observable<Produto> {
    return this.http
      .put<Produto>(`${this.apiUrl}/${produtoAtualizado.id}`, produtoAtualizado)
      .pipe(
        tap(produtoSalvo =>
          this.produtosState.update(produtos =>
            produtos.map(produto =>
              produto.id === produtoSalvo.id ? produtoSalvo : produto
            )
          )
        )
      );
  }

  remover(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() =>
        this.produtosState.update(produtos =>
          produtos.filter(produto => produto.id !== id)
        )
      )
    );
  }
}