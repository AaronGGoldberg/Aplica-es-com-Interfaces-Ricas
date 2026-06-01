import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-detalhar',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './produto-detalhar.html'
})
export class ProdutoDetalharComponent {
  readonly produto = input.required<Produto>();
  readonly fechar = output<void>();
}