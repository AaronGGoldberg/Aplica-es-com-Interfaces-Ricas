# AngularPrimeNgTailwind — CRUD de Produtos

Aplicação web construída com **Angular 21**, **PrimeNG 21** e estilização utilitária em estilo Tailwind para demonstrar um fluxo completo de CRUD (Create, Read, Update, Delete) de produtos.

---

## 1) Objetivo do projeto

Este repositório foi desenvolvido para:

* praticar a arquitetura de aplicação Angular;
* integrar uma biblioteca de componentes visuais Angular (PrimeNG);
* organizar um fluxo de cadastro, edição, remoção e detalhamento;
- demonstrar comunicação entre componentes usando APIs modernas do Angular e um service compartilhado;
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
- `ProdutoListarComponent`: listagem dos produtos e acionamento das ações de editar e detalhar pelo service;
- `ProdutoDetalharComponent`: visualização dos detalhes do produto selecionado;
- `ProdutoRemoverComponent`: remoção de produtos usando o service compartilhado.

Após a atividade de services, a comunicação dos dados do CRUD passou a ser centralizada no `ProdutoService`:

- `input.required<T>()` continua sendo usado quando um componente filho precisa receber um item específico, como no componente de remoção;
- o `ProdutoService` concentra a lista em memória e as operações de inserir, atualizar, detalhar, listar e remover;
- signals e computed signals no service armazenam produtos, edição, seleção e indicadores do dashboard.

---

## 5) Estrutura de arquivos (resumo)

```txt
src/
  app/
    app.ts                                      -> composição da tela e acesso ao ProdutoService
    app.html                                    -> composição dos componentes da tela
    app.spec.ts                                 -> testes unitários básicos
    components/
      produto-alterar/
        produto-alterar.ts                      -> componente de alteração usando ProdutoService
        produto-alterar.html                    -> formulário de edição com Signal Forms
      produto-detalhar/
        produto-detalhar.ts                     -> componente de detalhes usando ProdutoService
        produto-detalhar.html                   -> visualização do produto selecionado
      produto-incluir/
        produto-incluir.ts                      -> componente de inclusão usando ProdutoService
        produto-incluir.html                    -> formulário de cadastro com Signal Forms
      produto-listar/
        produto-listar.ts                       -> componente de listagem usando ProdutoService
        produto-listar.html                     -> tabela PrimeNG e ações do CRUD
      produto-remover/
        produto-remover.ts                      -> componente de remoção usando ProdutoService
        produto-remover.html                    -> botão PrimeNG de remoção do produto        
    models/produto.ts                           -> interface de dados
    services/produto.ts                         -> service com dados em memória e operações do CRUD    
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
- Uso de componentes menores e reutilizáveis para separar responsabilidades;
- Evolução posterior para comunicação de dados via `ProdutoService`;
* Preservação do modelo com atributos `string`, `number` e `boolean`.

### O que foi feito por funcionalidade/arquivo

| Funcionalidade | Arquivos principais | Descrição |
| --- | --- | --- |
| Orquestração do CRUD | `src/app/app.ts` e `src/app/app.html` | O componente principal passou a controlar somente o estado geral da tela, como lista de produtos, produto em edição, produto selecionado e indicadores do dashboard. Na etapa seguinte, essa responsabilidade foi movida para o `ProdutoService`. |
| Incluir produto | `src/app/components/produto-incluir/produto-incluir.ts` e `produto-incluir.html` | Componente responsável pelo formulário de cadastro. Ele valida `nome` e `preco` com Signal Forms e registra o produto por meio do `ProdutoService`. |
| Alterar produto | `src/app/components/produto-alterar/produto-alterar.ts` e `produto-alterar.html` | Componente responsável pelo formulário de edição. Ele lê o produto selecionado no `ProdutoService`, copia os dados para o formulário e solicita a atualização ou o cancelamento pelo service. |
| Listar produtos | `src/app/components/produto-listar/produto-listar.ts` e `produto-listar.html` | Componente responsável pela tabela PrimeNG. Ele lê a lista pelo `ProdutoService` e aciona edição ou detalhamento conforme o botão clicado. |
| Detalhar produto | `src/app/components/produto-detalhar/produto-detalhar.ts` e `produto-detalhar.html` | Componente responsável por exibir os dados do produto escolhido. Ele lê o produto detalhado no `ProdutoService` e fecha a área de detalhes pelo service. |
| Documentação | `README.md` | Documento atualizado para explicar o modelo, a estrutura de arquivos, a comunicação entre componentes e a divisão da tarefa por funcionalidades. |

### Fluxo de comunicação entre componentes

1. O `ProdutoService` armazena os dados em signals (`produtos`, `produtoEditando` e `produtoDetalhado`).
2. Quando não há produto em edição, o `App` mostra o componente de inclusão (`app-produto-incluir`).
3. Ao salvar um novo produto, o componente de inclusão chama `produtoService.inserir()`.
4. A listagem (`app-produto-listar`) lê os produtos com `produtoService.listar()` e aciona editar ou detalhar pelo service.
5. Ao editar, o service define `produtoEditando` e o `App` mostra `app-produto-alterar`.
6. Ao atualizar, o componente de alteração chama `produtoService.atualizar()` e o item correspondente é substituído na lista.
7. Ao detalhar, o service define `produtoDetalhado` e o `App` mostra `app-produto-detalhar`.
8. Ao remover, `app-produto-remover` chama `produtoService.remover()` e limpa edição/detalhe quando necessário.

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

## 9) Atividade: Serviços com dados em memória

Nesta evolução, o CRUD deixou de manter os dados diretamente no componente principal e passou a usar um **service Angular** para centralizar as informações do modelo `Produto` em memória.

### Service criado

O arquivo `src/app/services/produto.ts` define o `ProdutoService`, registrado com `providedIn: 'root'`. Isso permite que a mesma instância do serviço seja reutilizada por toda a aplicação.

O service concentra:

- a lista de produtos em memória;
- o produto selecionado para edição;
- o produto selecionado para detalhamento;
- indicadores calculados do dashboard, como total de produtos, total de ativos e valor total;
- as operações de **inserir**, **atualizar**, **detalhar**, **listar** e **remover**.

### Operações implementadas no ProdutoService

| Operação | Método | Responsabilidade |
| --- | --- | --- |
| Inserir | `inserir(produto)` | Cria um novo produto com `id` gerado em memória e adiciona na lista. |
| Atualizar | `atualizar(produtoAtualizado)` | Substitui os dados do produto existente e sincroniza o item detalhado quando necessário. |
| Detalhar | `detalhar(id)` | Busca o produto pelo `id` e define o item exibido no componente de detalhes. |
| Listar | `listar()` | Retorna a lista atual de produtos armazenada no service. |
| Remover | `remover(id)` | Remove o produto da lista e limpa a edição/detalhe caso o produto removido estivesse selecionado. |

### Componentes usando o service

| Componente | Uso do service |
| --- | --- |
| `ProdutoIncluirComponent` | Chama `produtoService.inserir()` ao salvar um novo produto. |
| `ProdutoAlterarComponent` | Lê `produtoService.produtoEditando()` e chama `produtoService.atualizar()` ao confirmar a edição. |
| `ProdutoListarComponent` | Chama `produtoService.listar()`, `produtoService.selecionarParaEdicao()` e `produtoService.detalhar()`. |
| `ProdutoDetalharComponent` | Lê `produtoService.produtoDetalhado()` e chama `produtoService.fecharDetalhes()`. |
| `ProdutoRemoverComponent` | Chama `produtoService.remover()` para excluir o produto recebido por `input.required<Produto>()`. |
| `App` | Usa o service apenas para compor a tela e exibir os indicadores calculados. |

### Fluxo após a refatoração para service

1. Os componentes não guardam mais a lista de produtos localmente.
2. O `ProdutoService` passa a ser a fonte única dos dados em memória.
3. A inclusão, alteração, listagem, detalhamento e remoção acessam o mesmo service por injeção de dependência.
4. O componente principal fica mais simples, pois não precisa mais implementar diretamente as regras de CRUD.
5. Os toasts continuam sendo exibidos pelos componentes que executam ações de inclusão, alteração e remoção.

---

## 👨‍💻 Autor

Projeto acadêmico organizado por **Aaron Goldberg**.
