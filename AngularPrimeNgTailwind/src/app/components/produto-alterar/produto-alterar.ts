import { Component, effect, input, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { form, FormField, FormRoot, max, min, minLength, required } from '@angular/forms/signals';

import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-alterar',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, FormRoot, FormField],
  templateUrl: './produto-alterar.html'
})
export class ProdutoAlterarComponent {
  readonly produto = input.required<Produto>();
  readonly produtoAtualizado = output<Produto>();
  readonly edicaoCancelada = output<void>();

  readonly model = signal<Produto>({
    id: 0,
    nome: '',
    preco: 0,
    ativo: true
  });

  readonly produtoForm = form(this.model, produto => {
    required(produto.nome, { message: 'O nome do produto é obrigatório.' });
    minLength(produto.nome, 3, { message: 'O nome deve ter no mínimo 3 caracteres.' });
    required(produto.preco, { message: 'O preço é obrigatório.' });
    min(produto.preco, 0.01, { message: 'O preço deve ser maior que zero.' });
    max(produto.preco, 999999.99, { message: 'O preço ultrapassa o limite permitido.' });
  });

  constructor() {
    effect(() => {
      this.model.set({ ...this.produto() });
    });
  }

  salvar() {
    if (this.produtoForm().invalid()) {
      return;
    }

    this.produtoAtualizado.emit({ ...this.model() });
  }
}