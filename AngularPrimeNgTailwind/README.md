# AngularPrimeNgTailwind — CRUD de Produtos

Aplicação web construída com **Angular 21**, **PrimeNG 21** e estilização utilitária em estilo Tailwind para demonstrar um fluxo completo de CRUD (Create, Read, Update, Delete) de produtos.

---

## 1) Objetivo do projeto

Este repositório foi desenvolvido para:

* praticar a arquitetura de aplicação Angular;
* integrar uma biblioteca de componentes visuais Angular (PrimeNG);
* organizar um fluxo de cadastro, edição, remoção e detalhamento;
* demonstrar comunicação entre componentes com APIs modernas baseadas em signals;
* demonstrar evolução incremental via commits.

---

## 2) Recursos utilizados

* **Angular 21**
* **PrimeNG 21**
* **TailWind**
* **TypeScript**
* **Node + npm**
* **Signal Forms** (`@angular/forms/signals`)

---

## 3) Modelo utilizado

O CRUD trabalha com o modelo `Produto`, que atende ao requisito de possuir pelo menos três tipos de atributos:

```ts
export interface Produto {
  id: number;
  nome: string;
  preco: number;
  ativo: boolean;
}
```

* `nome`: atributo do tipo **string**;
* `preco` e `id`: atributos do tipo **number**;
* `ativo`: atributo do tipo **boolean**.

---

## 4) Funcionalidades implementadas

### CRUD de produtos

* ✅ Criar novo produto
* ✅ Listar produtos em tabela
* ✅ Editar produto existente
* ✅ Remover produto
* ✅ Visualizar detalhes do produto

### Feedback visual

* ✅ Toasts de sucesso/aviso para criação, atualização e remoção

### Componentização da atividade 09

A tela principal foi refatorada em componentes dedicados para cada operação do modelo:

* `ProdutoIncluirComponent`: formulário de inclusão de produtos;
* `ProdutoAlterarComponent`: formulário de alteração de produtos;
* `ProdutoListarComponent`: listagem dos produtos e emissão das ações de editar, remover e detalhar;
* `ProdutoDetalharComponent`: visualização dos detalhes do produto selecionado.

A comunicação entre o componente principal e os componentes filhos utiliza as funções modernas do Angular:

* `input.required<T>()` para receber dados nos componentes de listagem, alteração e detalhamento;
* `output<T>()` para emitir ações dos componentes filhos para o componente principal;
* signals e computed signals no componente principal para armazenar produtos, edição, seleção e indicadores do dashboard.

---

## 5) Estrutura de arquivos (resumo)

```txt
src/
  app/
    app.ts                                      -> estado principal, computed signals e orquestração do CRUD
    app.html                                    -> composição dos componentes da tela
    app.spec.ts                                 -> testes unitários básicos
    components/
      produto-alterar/
        produto-alterar.ts                      -> componente de alteração com input() e output()
        produto-alterar.html                    -> formulário de edição com Signal Forms
      produto-detalhar/
        produto-detalhar.ts                     -> componente de detalhes com input() e output()
        produto-detalhar.html                   -> visualização do produto selecionado
      produto-incluir/
        produto-incluir.ts                      -> componente de inclusão com output()
        produto-incluir.html                    -> formulário de cadastro com Signal Forms
      produto-listar/
        produto-listar.ts                       -> componente de listagem com input() e output()
        produto-listar.html                     -> tabela PrimeNG e ações do CRUD
    models/produto.ts                           -> interface de dados
  main.ts                                       -> bootstrap da aplicação
  styles.css                                    -> estilos globais
angular.json                                    -> build, budgets e configurações do Angular
package.json                                    -> scripts e dependências
```

---

## 6) Como executar localmente

### Pré-requisitos

* Node.js
* npm

### Instalação

```bash
npm install
```

### Executar em desenvolvimento

```bash
npm start
```

### Gerar build de produção

```bash
npm run build
```

### Executar testes

```bash
npm test
```

---

## 7) Atividade: Formulários com Signals

Nesta evolução, a operação de **Inclusão / Alteração** foi refeita com **Signal Forms** (`@angular/forms/signals`):

* o formulário usa `formRoot` e `formField` para bind declarativo com o model em signal;
* validações aplicadas:

  * `required` e `minLength(3)` para **nome**;
  * `min(0.01)` e `max(999999.99)` para **preço**;
* mensagens de erro aparecem quando o campo foi tocado e está inválido;
* o botão de **Salvar / Atualizar** fica desabilitado enquanto o formulário estiver inválido.

### Objetivos atendidos

* Reescrita da inclusão/alteração com Signal Forms;
* Feedback de preenchimento incorreto;
* Controle de envio apenas com formulário válido.

---

## 8) Atividade: Componentes Angular para o modelo

Esta tarefa segue a proposta de componentes Angular da aula 09, reaproveitando o projeto anterior e mantendo a biblioteca de UI **PrimeNG**. A mudança principal foi tirar a responsabilidade de todas as operações do arquivo principal e distribuir cada parte do CRUD em componentes menores, cada um com uma função clara.

### Objetivos atendidos

* Refatoração do CRUD de produtos em componentes distintos para **incluir**, **alterar**, **listar** e **detalhar**;
* Manutenção da ação de **remover** a partir do componente de listagem;
* Uso de `input()`/`input.required()` para passagem de dados do componente pai para componentes filhos;
* Uso de `output()` para comunicação de eventos dos componentes filhos para o componente principal;
* Preservação do modelo com atributos `string`, `number` e `boolean`.

### O que foi feito por funcionalidade/arquivo

| Funcionalidade | Arquivos principais | Descrição |
| --- | --- | --- |
| Orquestração do CRUD | `src/app/app.ts` e `src/app/app.html` | O componente principal passou a controlar somente o estado geral da tela, como lista de produtos, produto em edição, produto selecionado e indicadores do dashboard. Ele também recebe os eventos emitidos pelos componentes filhos e atualiza os signals. |
| Incluir produto | `src/app/components/produto-incluir/produto-incluir.ts` e `produto-incluir.html` | Componente responsável pelo formulário de cadastro. Ele valida `nome` e `preco` com Signal Forms e emite o produto criado para o componente principal por meio de `output<Produto>()`. |
| Alterar produto | `src/app/components/produto-alterar/produto-alterar.ts` e `produto-alterar.html` | Componente responsável pelo formulário de edição. Ele recebe o produto selecionado com `input.required<Produto>()`, copia os dados para o formulário e emite o produto atualizado ou o cancelamento da edição. |
| Listar produtos | `src/app/components/produto-listar/produto-listar.ts` e `produto-listar.html` | Componente responsável pela tabela PrimeNG. Ele recebe a lista com `input.required<Produto[]>()` e emite ações de editar, remover e detalhar conforme o botão clicado. |
| Detalhar produto | `src/app/components/produto-detalhar/produto-detalhar.ts` e `produto-detalhar.html` | Componente responsável por exibir os dados do produto escolhido. Ele recebe o produto com `input.required<Produto>()` e emite um evento para fechar a área de detalhes. |
| Documentação | `README.md` | Documento atualizado para explicar o modelo, a estrutura de arquivos, a comunicação entre componentes e a divisão da tarefa por funcionalidades. |

### Fluxo de comunicação entre componentes

1. O componente principal (`App`) armazena os dados em signals (`produtos`, `produtoEditando` e `produtoSelecionado`).
2. Quando não há produto em edição, o `App` mostra o componente de inclusão (`app-produto-incluir`).
3. Ao salvar um novo produto, o componente de inclusão emite `produtoCriado`, e o `App` adiciona o item na lista.
4. A listagem (`app-produto-listar`) recebe os produtos por `input` e emite ações por `output`: editar, remover ou detalhar.
5. Ao editar, o `App` define `produtoEditando` e passa esse produto para `app-produto-alterar`.
6. Ao atualizar, o componente de alteração emite `produtoAtualizado`, e o `App` substitui o item correspondente na lista.
7. Ao detalhar, o `App` define `produtoSelecionado` e passa o item para `app-produto-detalhar`.

### Sugestão de commits semânticos por funcionalidade/arquivo

Caso a tarefa seja registrada em commits menores, uma organização possível é:

```bash
feat(produto-incluir): cria componente de cadastro de produtos
feat(produto-alterar): cria componente de edição de produtos
feat(produto-listar): cria componente de listagem e ações do CRUD
feat(produto-detalhar): cria componente de visualização de detalhes
refactor(app): centraliza estado e composição dos componentes do CRUD
docs(readme): detalha componentização e fluxo da atividade
test(app): atualiza teste do título da aplicação
chore(build): ajusta orçamento de bundle do Angular
```

---

## 👨‍💻 Autor

Projeto acadêmico organizado por **Aaron Goldberg**.
