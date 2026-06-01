import { Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

import { ProdutoAlterarComponent } from './components/produto-alterar/produto-alterar';
import { ProdutoDetalharComponent } from './components/produto-detalhar/produto-detalhar';
import { ProdutoIncluirComponent } from './components/produto-incluir/produto-incluir';
import { ProdutoListarComponent } from './components/produto-listar/produto-listar';
import { ProdutoService } from './services/produto';

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
  readonly produtoService = inject(ProdutoService);
}