# AngularPrimeNgTailwind — CRUD de Produtos

Aplicação web construída com **Angular 21**, **PrimeNG 21** e estilização utilitária em estilo Tailwind para demonstrar um fluxo completo de CRUD (Create, Read, Update, Delete) de produtos.

---

## 1) Objetivo do projeto

Este repositório foi desenvolvido para:

- praticar a arquitetura de aplicação Angular;
- integrar biblioteca de componentes visuais (PrimeNG);
- organizar um fluxo de cadastro, edição, remoção e detalhamento;
- demonstrar evolução incremental via commits.

---

## 2) Recursos utilizados

- **Angular 21**
- **PrimeNG 21**
- **TailWind**
- **TypeScript**
- **Node + npm**

---

## 3) Funcionalidades implementadas

### CRUD de produtos

- ✅ Criar novo produto
- ✅ Listar produtos em tabela
- ✅ Editar produto existente
- ✅ Remover produto
- ✅ Visualizar detalhes do produto

### Feedback visual

- ✅ Toasts de sucesso/aviso para criação, atualização e remoção

---

## 4) Estrutura de arquivos (resumo)

```txt
src/
  app/
    app.ts              -> lógica principal do CRUD
    app.html            -> template da interface
    app.spec.ts         -> testes unitários
    models/produto.ts   -> interface de dados
  main.ts               -> bootstrap da aplicação
  styles.css            -> estilos globais
angular.json            -> build, budgets e configurações do Angular
package.json            -> scripts e dependências
```

---

## 6) Como executar localmente

### Pré-requisitos

- Node.js
- npm

### Instalação

```bash
npm install
```
### Executar em desenvolvimento

```bash
npm start
```

## 👨‍💻 Autor

Projeto acadêmico organizado por **Aaron Goldberg**.
---

## 7) Atividade: Formulários com Signals

Nesta evolução, a operação de **Inclusão / Alteração** foi refeita com **Signal Forms** (`@angular/forms/signals`):

- o formulário agora usa `formRoot` e `formField` para bind declarativo com o model em signal;
- validações aplicadas:
  - `required` e `minLength(3)` para **nome**;
  - `min(0.01)` e `max(999999.99)` para **preço**;
- mensagens de erro aparecem quando o campo foi tocado e está inválido;
- o botão de **Salvar / Atualizar** fica desabilitado enquanto o formulário estiver inválido.

### Objetivos atendidos

- Reescrita da inclusão/alteração com Signal Forms;
- Feedback de preenchimento incorreto;
- Controle de envio apenas com formulário válido.