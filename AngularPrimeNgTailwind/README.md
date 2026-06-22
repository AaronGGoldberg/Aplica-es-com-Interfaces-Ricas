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
* **HttpClient**
* **Backend REST/JSON local em Node.js**

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
- o `ProdutoService` concentra as operações de inserir, atualizar, detalhar, listar e remover usando o backend REST/JSON;
- signals e computed signals no service mantêm a listagem carregada do backend e os indicadores do dashboard atualizados.

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
    services/produto.ts                         -> service com HttpClient e operações REST/JSON do CRUD   
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
npm run backend
```

Em outro terminal, execute o frontend Angular com proxy para o backend:

```bash
npm start
```

O script `npm start` usa `proxy.conf.json` para redirecionar as chamadas de `/api` para `http://localhost:3000`. Por isso, a mesma configuração funciona no **localhost** e no **GitHub Codespaces**: o navegador acessa a API pela mesma origem do frontend, e o servidor de desenvolvimento do Angular encaminha a requisição internamente para o backend.

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

--- 

## 9) Atividade: Serviços

Nesta evolução, o CRUD deixou de manter os dados diretamente no componente principal e passou a usar um **service Angular** para centralizar as operações do modelo `Produto`. Na atividade seguinte, esse service foi adaptado para buscar e salvar dados no backend REST/JSON.

### Service criado

O arquivo `src/app/services/produto.ts` define o `ProdutoService`, registrado com `providedIn: 'root'`. Isso permite que a mesma instância do serviço seja reutilizada por toda a aplicação.

O service concentra:

- o estado local da listagem carregada do backend;
- indicadores calculados do dashboard, como total de produtos, total de ativos e valor total;
- as operações de **inserir**, **atualizar**, **detalhar**, **listar** e **remover**.

### Operações implementadas no ProdutoService

| Operação | Método | Responsabilidade |
| --- | --- | --- |
| Inserir | `inserir(produto)` | Envia `POST` para criar um produto no backend. |
| Atualizar | `atualizar(produtoAtualizado)` | Envia `PUT` para substituir os dados do produto existente. |
| Detalhar | `buscarPorId(id)` | Envia `GET` para buscar um produto específico pelo `id`. |
| Listar | `listar()` | Envia `GET` para carregar a lista de produtos do backend. |
| Remover | `remover(id)` | Envia `DELETE` para remover o produto no backend. |

### Componentes usando o service

| Componente | Uso do service |
| --- | --- |
| `ProdutoIncluirComponent` | Chama `produtoService.inserir()` ao salvar um novo produto. |
| `ProdutoAlterarComponent` | Chama `produtoService.buscarPorId()` para preencher o formulário e `produtoService.atualizar()` ao confirmar a edição. |
| `ProdutoListarComponent` | Chama `produtoService.listar()` e navega para as rotas de edição ou detalhe. |
| `ProdutoDetalharComponent` | Chama `produtoService.buscarPorId()` para carregar os dados completos do produto. |
| `ProdutoRemoverComponent` | Chama `produtoService.remover()` para excluir o produto recebido por `input.required<Produto>()`. |
| `App` | Usa o service apenas para compor a tela e exibir os indicadores calculados. |

### Fluxo após a refatoração para service

1. Os componentes não guardam mais a lista de produtos localmente.
2. O `ProdutoService` passa a ser o ponto único de comunicação entre os componentes e o backend..
3. A inclusão, alteração, listagem, detalhamento e remoção acessam o mesmo service por injeção de dependência.
4. O componente principal fica mais simples, pois não precisa mais implementar diretamente as regras de CRUD.
5. Os toasts continuam sendo exibidos pelos componentes que executam ações de inclusão, alteração e remoção.

---

## 10) Atividade: Rotas

Nesta evolução, a aplicação passou a usar o **Angular Router** para acessar as operações do modelo `Produto` por URLs distintas.

### Rotas criadas

| Rota | Componente | Finalidade |
| --- | --- | --- |
| `/produtos` | `ProdutoListarComponent` | Lista todos os produtos cadastrados. |
| `/produtos/novo` | `ProdutoIncluirComponent` | Abre o formulário de inclusão de produto. |
| `/produtos/:id/detalhar` | `ProdutoDetalharComponent` | Exibe os detalhes do produto selecionado na listagem. |
| `/produtos/:id/editar` | `ProdutoAlterarComponent` | Abre o formulário de atualização do produto selecionado na listagem. |
| `/` | redirecionamento | Redireciona automaticamente para `/produtos`. |
| `**` | redirecionamento | Redireciona rotas inválidas para `/produtos`. |

### Comunicação entre listagem, detalhe e atualização

A listagem ativa as rotas de detalhe e atualização enviando o produto selecionado no estado da navegação:

- ao clicar em **editar**, `ProdutoListarComponent` chama `router.navigate(['/produtos', produto.id, 'editar'], { state: { produto } })`;
- ao clicar em **detalhar**, `ProdutoListarComponent` chama `router.navigate(['/produtos', produto.id, 'detalhar'], { state: { produto } })`.

Os componentes `ProdutoAlterarComponent` e `ProdutoDetalharComponent` leem essa informação da nova rota ativada usando o estado da navegação (`router.getCurrentNavigation()?.extras.state`) e também usam o parâmetro `:id` da rota como fallback para buscar o produto no `ProdutoService`.

### Arquivos alterados nesta atividade

| Arquivo | Alteração |
| --- | --- |
| `src/app/app.routes.ts` | Definição das rotas de listagem, inclusão, detalhe e atualização. |
| `src/app/app.ts` | Importação de `RouterOutlet`, `RouterLink` e `RouterLinkActive` para composição com rotas. |
| `src/app/app.html` | Inclusão do menu de navegação e do `<router-outlet>`. |
| `src/app/components/produto-listar/*` | Botões de detalhe e edição passaram a ativar rotas com o produto no estado da navegação. |
| `src/app/components/produto-detalhar/*` | Leitura do produto recebido pela rota e exibição dos detalhes em rota própria. |
| `src/app/components/produto-alterar/*` | Leitura do produto recebido pela rota e edição em rota própria. |
| `src/app/components/produto-incluir/*` | Inclusão em rota própria e retorno para a listagem após salvar. |
| `src/app/services/produto.ts` | Métodos auxiliares para definir produto em edição e produto detalhado a partir da rota. |
| `src/app/app.spec.ts` | Configuração do provider de rotas no teste do componente principal. |

---

## 11) Atividade: Comunicação com Backend REST/JSON

Nesta evolução, o CRUD de produtos deixou de usar armazenamento apenas em memória e passou a se comunicar com um backend REST/JSON local.

### Como a integração funciona

* O backend Node.js expõe a rota `/produtos` na porta `3000`.
* O frontend Angular chama a API por `/api/produtos`, usando `HttpClient`.
* O arquivo `proxy.conf.json` do Angular redireciona `/api` para `http://localhost:3000` durante o `npm start`.
* Essa abordagem evita URL fixa no service e funciona tanto localmente quanto no GitHub Codespaces, pois o navegador não precisa chamar diretamente `localhost:3000`.

### Executar no localhost ou Codespaces

Abra dois terminais dentro da pasta `AngularPrimeNgTailwind`:

Terminal 1 — backend REST/JSON:

```bash
npm run backend
```

Terminal 2 — frontend Angular com proxy:

```bash
npm start
```

No Codespaces, abra a porta encaminhada do Angular, normalmente `4200`. Não é necessário trocar manualmente a URL da API no código.

### Operações atendidas pelo backend

| Operação | Método HTTP | Endpoint usado pelo Angular | Endpoint real no backend |
| --- | --- | --- | --- |
| Listar | `GET` | `/api/produtos` | `/produtos` |
| Detalhar | `GET` | `/api/produtos/:id` | `/produtos/:id` |
| Inserir | `POST` | `/api/produtos` | `/produtos` |
| Atualizar | `PUT` | `/api/produtos/:id` | `/produtos/:id` |
| Remover | `DELETE` | `/api/produtos/:id` | `/produtos/:id` |

### Arquivos principais desta atividade

| Arquivo | Responsabilidade |
| --- | --- |
| `backend.js` | Backend REST/JSON local sem dependências externas. |
| `db.json` | Base JSON inicial dos produtos. |
| `proxy.conf.json` | Proxy do Angular para funcionar em localhost e Codespaces. |
| `src/app/services/produto.ts` | Service Angular com `HttpClient` para todas as operações de CRUD. |
| `src/app/app.config.ts` | Registro de `provideHttpClient()`. |

---

## 👨‍💻 Autor

Projeto acadêmico organizado por **Aaron Goldberg**.
