import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-detalhar',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './produto-detalhar.html'
})
export class ProdutoDetalharComponent {
  readonly produtoService = inject(ProdutoService);
}