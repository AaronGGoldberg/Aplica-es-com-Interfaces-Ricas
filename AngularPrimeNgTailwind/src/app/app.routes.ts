import { Routes } from '@angular/router';

import { ProdutoAlterarComponent } from './components/produto-alterar/produto-alterar';
import { ProdutoDetalharComponent } from './components/produto-detalhar/produto-detalhar';
import { ProdutoIncluirComponent } from './components/produto-incluir/produto-incluir';
import { ProdutoListarComponent } from './components/produto-listar/produto-listar';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },
  {
    path: 'produtos',
    component: ProdutoListarComponent
  },
  {
    path: 'produtos/novo',
    component: ProdutoIncluirComponent
  },
  {
    path: 'produtos/:id/detalhar',
    component: ProdutoDetalharComponent
  },
  {
    path: 'produtos/:id/editar',
    component: ProdutoAlterarComponent
  },
  {
    path: '**',
    redirectTo: 'produtos'
  }
];