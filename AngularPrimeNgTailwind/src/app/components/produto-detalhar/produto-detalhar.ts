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
  readonly produtoEncontrado = signal(true);

  readonly produto = signal<Produto | null>(null);

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly produtoService = inject(ProdutoService);

  ngOnInit() {
    const produtoId = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    const produto = this.produtoService.buscarPorId(produtoId);

    if (!produto) {
      this.produtoEncontrado.set(false);
      return;
    }

    this.produto.set(produto);
  }

  fechar() {
    this.router.navigate(['/produtos']);
  }
}