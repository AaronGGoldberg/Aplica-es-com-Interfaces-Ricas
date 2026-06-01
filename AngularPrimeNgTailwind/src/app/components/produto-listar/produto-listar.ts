import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-listar',
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule],
  templateUrl: './produto-listar.html'
})
export class ProdutoListarComponent {
  readonly produtos = input.required<Produto[]>();
  readonly editar = output<Produto>();
  readonly remover = output<Produto>();
  readonly detalhar = output<Produto>();
}