import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-detalhar',
  standalone: true,
  imports: [ButtonModule, RouterLink],
  templateUrl: './produto-detalhar.html'
})
export class ProdutoDetalharComponent implements OnInit {
  readonly produtoService = inject(ProdutoService);
  readonly produtoEncontrado = signal(true);

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  ngOnInit() {
    const produtoDaRota = this.produtoRecebidoPelaRota();
    const produtoId = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    if (produtoDaRota?.id === produtoId) {
      this.produtoService.definirProdutoDetalhado(produtoDaRota);
      this.produtoEncontrado.set(true);
      return;
    }

    const produto = this.produtoService.detalhar(produtoId);
    this.produtoEncontrado.set(Boolean(produto));
  }

  fechar() {
    this.produtoService.fecharDetalhes();
    this.router.navigate(['/produtos']);
  }

  private produtoRecebidoPelaRota(): Produto | null {
    const state = this.router.getCurrentNavigation()?.extras.state ?? history.state;
    const produto = state?.['produto'] as Produto | undefined;

    return produto ?? null;
  }
}