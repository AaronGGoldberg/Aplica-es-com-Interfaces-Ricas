import { Routes } from '@angular/router';

import { ProdutoAlterarComponent } from './components/produto-alterar/produto-alterar';
import { ProdutoDetalharComponent } from './components/produto-detalhar/produto-detalhar';
import { ProdutoIncluirComponent } from './components/produto-incluir/produto-incluir';
import { ProdutoListarComponent } from './components/produto-listar/produto-listar';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'produtos',
    component: ProdutoListarComponent,
    canActivate: [authGuard]
  },
  {
    path: 'produtos/novo',
    component: ProdutoIncluirComponent,
    canActivate: [authGuard]
  },
  {
    path: 'produtos/:id/detalhar',
    component: ProdutoDetalharComponent,
    canActivate: [authGuard]
  },
  {
    path: 'produtos/:id/editar',
    component: ProdutoAlterarComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'produtos'
  }
];