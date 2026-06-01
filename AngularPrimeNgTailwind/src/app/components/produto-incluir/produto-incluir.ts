import { Component, output, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { form, FormField, FormRoot, max, min, minLength, required } from '@angular/forms/signals';

import { Produto } from '../../models/produto';

@Component({
  selector: 'app-produto-incluir',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, InputTextModule, FormRoot, FormField],
  templateUrl: './produto-incluir.html'
})
export class ProdutoIncluirComponent {
  readonly produtoCriado = output<Produto>();

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

  salvar() {
    if (this.produtoForm().invalid()) {
      return;
    }

    this.produtoCriado.emit({ ...this.model(), id: Date.now() });
    this.resetarFormulario();
  }

  resetarFormulario() {
    this.model.set({ id: 0, nome: '', preco: 0, ativo: true });
  }
}