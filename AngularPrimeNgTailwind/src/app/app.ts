import { Component, computed, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { form, FormField, FormRoot, max, min, minLength, required } from '@angular/forms/signals';

import { Produto } from './models/produto';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    TableModule,
    ToastModule,
    InputTextModule,
    CheckboxModule,
    FormRoot,
    FormField
  ],
  providers: [MessageService],
  templateUrl: './app.html'
})
export class App {
  produtos = signal<Produto[]>([]);

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

  editando = false;
  produtoEditandoId: number | null = null;

  produtoSelecionado: Produto | null = null;

  constructor(private messageService: MessageService) {}

  salvar() {
    if (this.produtoForm().invalid()) {
      return;
    }

    const produtoAtual = this.model();

    if (this.editando) {
      this.produtos.update(produtos =>
        produtos.map(p => (p.id === this.produtoEditandoId ? { ...produtoAtual } : p))
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Atualizado',
        detail: 'Produto atualizado com sucesso!'
      });

      this.editando = false;
      this.produtoEditandoId = null;
    } else {
      this.produtos.update(produtos => [...produtos, { ...produtoAtual, id: Date.now() }]);

      this.messageService.add({
        severity: 'success',
        summary: 'Criado',
        detail: 'Produto adicionado!'
      });
    }

    this.resetarFormulario();
  }

  editar(produto: Produto) {
    this.model.set({ ...produto });
    this.editando = true;
    this.produtoEditandoId = produto.id;

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  remover(produto: Produto) {
    this.produtos.update(produtos => produtos.filter(p => p.id !== produto.id));

    if (this.produtoSelecionado?.id === produto.id) {
      this.produtoSelecionado = null;
    }

    this.messageService.add({
      severity: 'warn',
      summary: 'Removido',
      detail: 'Produto excluído'
    });
  }

  detalhar(produto: Produto) {
    this.produtoSelecionado = produto;
  }

  fecharDetalhes() {
    this.produtoSelecionado = null;
  }

  resetarFormulario() {
    this.model.set({ id: 0, nome: '', preco: 0, ativo: true });
  }
}