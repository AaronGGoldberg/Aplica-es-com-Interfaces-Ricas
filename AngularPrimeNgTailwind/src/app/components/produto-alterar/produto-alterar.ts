import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import {
  form,
  FormField,
  FormRoot,
  max,
  min,
  minLength,
  required
} from '@angular/forms/signals';

import { Produto } from '../../models/produto';
import { ProdutoService } from '../../services/produto';

@Component({
  selector: 'app-produto-alterar',
  standalone: true,
  imports: [
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    RouterLink,
    FormRoot,
    FormField
  ],
  templateUrl: './produto-alterar.html'
})
export class ProdutoAlterarComponent implements OnInit {
  readonly produtoService = inject(ProdutoService);

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  readonly produtoEncontrado = signal(true);

  readonly model = signal<Produto>({
    id: 0,
    nome: '',
    preco: 0,
    ativo: true
  });

  readonly produtoForm = form(this.model, produto => {
    required(produto.nome, {
      message: 'O nome do produto é obrigatório.'
    });

    minLength(produto.nome, 3, {
      message: 'O nome deve ter no mínimo 3 caracteres.'
    });

    required(produto.preco, {
      message: 'O preço é obrigatório.'
    });

    min(produto.preco, 0.01, {
      message: 'O preço deve ser maior que zero.'
    });

    max(produto.preco, 999999.99, {
      message: 'O preço ultrapassa o limite permitido.'
    });
  });

  ngOnInit() {
    const produtoId = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );

    const produto = this.produtoService.buscarPorId(produtoId);

    if (!produto) {
      this.produtoEncontrado.set(false);
      return;
    }

    this.model.set({ ...produto });
  }

  salvar() {
    if (this.produtoForm().invalid()) {
      return;
    }

    const produtoAtualizado =
      this.produtoService.atualizar({
        ...this.model()
      });

    if (!produtoAtualizado) {
      this.messageService.add({
        severity: 'error',
        summary: 'Erro',
        detail: 'Produto não encontrado para atualização.'
      });

      return;
    }

    this.messageService.add({
      severity: 'success',
      summary: 'Atualizado',
      detail: 'Produto atualizado com sucesso!'
    });

    this.router.navigate(['/produtos']);
  }

  cancelar() {
    this.router.navigate(['/produtos']);
  }
}