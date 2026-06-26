# Plano de Implementação API - Sistema de Gestão de Contratos e Obras

Com base nas definições do PDF e no refinamento de escopo focado no back-end (entregável em ~7h), a API será construída utilizando **Node.js, Express, TypeScript, Prisma e PostgreSQL (via Docker)**. Seguiremos a **Clean Architecture**, com design patterns **Factory** e **Injeção de Dependência**.

---

## 1. Módulos e Escopo Redefinido

### 1.1 Módulo de Usuários e Autenticação (Users & Auth)
*   **Regras:** Gestão básica de usuários e login.
*   **Funcionalidades:**
    *   Criação de Usuário (Sign Up).
    *   Autenticação e geração de token JWT (Sign In).
    *   Middleware de proteção de rotas privadas.

### 1.2 Módulo de Tenants (Companies)
*   **Regras:** Isolamento de dados por empresa (multi-tenant). O fluxo exige que um usuário recém-criado/logado crie e selecione um tenant antes de operar o sistema.
*   **Funcionalidades:**
    *   Criação de Company (Tenant).
    *   Vinculação do Usuário logado a uma Company.
    *   Middleware para validar e injetar o `company_id` nas requisições.

### 1.3 Módulo de Templates e Contratos
*   **Regras:** Coração do sistema. Gestão de modelos e geração de contratos a partir deles.
*   **Funcionalidades:**
    *   Criação e Biblioteca de Templates (Prestação de Serviço, Trabalho, Obra, etc.).
    *   Gestão de campos dinâmicos por template (partes, valores, datas, assinaturas).
    *   Criação de Contrato com preenchimento guiado a partir de um template (Status inicial: *Rascunho*).
    *   Visualização completa do contrato (resumo de dados).
    *   Listagem de contratos da empresa com filtros.

### 1.4 Módulo de Assinatura Eletrônica
*   **Regras:** Fluxo de disparo e atualização de status do contrato.
*   **Funcionalidades:**
    *   Disparo de link de assinatura via **E-mail (usando Resend)**.
    *   Callback/Webhook para capturar assinatura das partes.
    *   Atualização automática de status para *Assinado*.

### 1.5 Módulo de Obras
*   **Regras:** Gestão básica de obras vinculadas a contratos. Demais features financeiras (custos, orçamentos e compras) ficam como "Nice to have" para o fim do prazo.
*   **Funcionalidades:**
    *   Criação de Obra associada a um Contrato existente.
    *   Listagem simples das obras do Tenant.

---

## 2. Padrões e Arquitetura

Estruturaremos o projeto utilizando **Clean Architecture Baseada em Módulos**, inspirada no projeto de referência (`pagana-disparador-api`). Isso garante que cada funcionalidade do sistema seja autocontida.

A estrutura de pastas seguirá o padrão:

```text
src/
  [module-name]/
    domain/          # Entidades (entities), Interfaces (interfaces), Errors, DTOs
    application/     # Casos de Uso (use-cases)
    infra/           # Controllers, Repositories (Prisma), Factories, Routes
  shared/            # Middlewares, Utils, Configurações (ex: JWT, Env)
  server.ts          # Entrypoint do Express
```
---

## 3. Etapas de Execução (Roadmap)

### Etapa 1: Definições de Ferramentas, Schema de Dados e Setup Inicial
*   Inicialização do **Git**.
*   Setup de bibliotecas e ferramentas de qualidade: **ESLint**, **Prettier** e configurações do **TypeScript**.
*   Configuração do **Docker** e `docker-compose.yml` para rodar o banco de dados PostgreSQL isolado.
*   Instalação e inicialização do **Prisma ORM**.
*   Modelagem detalhada e definição do Schema no arquivo `schema.prisma` (`User`, `Company`, `ContractTemplate`, `ContractTemplateField`, `Contract`, `Obra`) e execução das migrations.
*   Configuração de Variáveis de Ambiente (`.env` e `.env.example`).
*   Setup básico do **Express** (`server.ts`).

### Etapa 2: Módulo de Usuários e Autenticação (Users & Auth)
*   Criação da estrutura modular (`src/users/domain`, `src/users/application`, `src/users/infra`).
*   Implementação dos Casos de Uso e Controllers de Registro e Login.
*   Implementação da Factory e Rotas.
*   Implementação do Middleware de Autenticação (JWT) na pasta `shared/`.

### Etapa 3: Módulo de Tenants (Companies)
*   Criação do módulo `src/companys`.
*   Implementação dos Casos de Uso e Controllers de Company (Tenant).
*   Implementação do Middleware de Tenant (garantir isolamento por `company_id`).

### Etapa 4: Módulo de Templates e Contratos
*   Criação do módulo `src/contracts` e `src/templates`.
*   Endpoints para CRUD básico de Templates e Campos Dinâmicos.
*   Endpoint para criar Contrato vinculando Template e preenchendo campos dinâmicos.
*   Endpoint para listagem de contratos.

### Etapa 5: Integração de Assinaturas (Resend)
*   Implementação do módulo de Assinaturas.
*   Adapter de Email usando SDK do Resend.
*   Endpoint para enviar contrato por e-mail e alterar status.
*   Endpoint "Mock" (webhook) que simula a assinatura do link, atualizando o status para *Assinado*.

### Etapa 6: Módulo de Obras (Simplificado)
*   Criação do módulo `src/obras`.
*   Endpoints para Criar e Listar Obras vinculadas a um contrato assinado.

### Etapa 7: Finalização e Revisão
*   Testes de fluxo local e refinamentos.
*   Documentação no `README.md` ensinando como rodar a aplicação via Docker.

---

## 4. Próximo Passo

> [!IMPORTANT]
> O plano está finalizado de acordo com a arquitetura do projeto de referência e o novo escopo. Assim que você der o **"De Acordo"**, darei início imediato à **Etapa 1**, onde começarei a configurar o Git, ESLint, Prettier, Prisma, Docker e os Schemas do banco de dados.
