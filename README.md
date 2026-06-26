# Contracts Management API

#### API do sistema de Gestão de Contratos e Obras (SaaS), focada em multi-tenancy, geração dinâmica de contratos a partir de templates e integração de assinatura eletrônica.

<br/>

## Principais Funcionalidades da Aplicação

- Autenticação e gestão de usuários (RBAC).
- Arquitetura Multi-Tenant (Múltiplas empresas isoladas no mesmo banco de dados).
- Gestão de bibliotecas de Templates (modelos de contratos com campos dinâmicos).
- Geração automatizada de Contratos.
- Envio de contratos por e-mail e fluxo de Assinatura Eletrônica.
- Gestão e vinculação de Obras aos contratos gerados.

<br/>

## Tecnologias Utilizadas

- **Node.js:** Ambiente de execução do JavaScript no servidor.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Express:** Framework web focado em performance e estrutura clássica.
- **Prisma ORM:** Utilizado para a comunicação tipada com o banco de dados.
- **PostgreSQL:** Banco de dados relacional (via Docker).
- **Zod:** Biblioteca para validação de esquemas e dados (DTOs).
- **Resend:** SDK e provedor para disparo de emails transacionais (assinaturas).
- **Clean Architecture:** Estrutura modular, com divisão de responsabilidades (Domain, Application, Infra).

<br/>

## Escopo e Viabilidade

O projeto foi projetado com foco no **MVP (Minimum Viable Product)** e entrega de valor rápida (viabilidade de tempo). Para garantir o cumprimento do prazo de desenvolvimento sem sacrificar a qualidade e a segurança da arquitetura, o escopo focou na gestão base do sistema:
- O preenchimento dos contratos foi modelado em formato `JSON` dinâmico para garantir flexibilidade sem prender o banco de dados a N colunas rígidas.
- A assinatura eletrônica foi viabilizada de forma simplificada, onde um link seguro via email altera o estado do contrato, postergando integrações complexas (como biometria ou docusign) para um segundo momento.
- O módulo de obras foca apenas no vínculo de projetos aos contratos, isolando partes financeiras (orçamento, compras) que fugiam da viabilidade do MVP atual.

<br/>

## RFs (Requisitos Funcionais)

- ### Usuários e Autenticação
  - [✅] Deve ser possível cadastrar um usuário (Sign Up).
  - [✅] Deve ser possível autenticar um usuário e gerar um token JWT (Sign In).
  - [✅] Rotas privadas devem ser protegidas por middleware.

- ### Tenant (Company)
  - [✅] Deve ser possível criar uma Company (Tenant).
  - [✅] O usuário logado deve estar vinculado a uma Company.
  - [✅] Todas as requisições privadas devem carregar o `companyId` para isolamento de dados.

- ### Templates e Contratos
  - [✅] Deve ser possível criar templates de contratos com seus respectivos campos dinâmicos.
  - [✅] Deve ser possível listar templates disponíveis na empresa.
  - [✅] Deve ser possível criar um contrato (em status Rascunho) utilizando um template.
  - [✅] Deve ser possível preencher dados dinâmicos no contrato.
  - [✅] Deve ser possível listar os contratos gerados.

- ### Assinatura Eletrônica
  - [✅] Deve ser possível disparar o contrato por email (via Resend) para assinatura (Status: `WAITING_FOR_SIGNATURE`).
  - [✅] Deve haver um endpoint público para confirmar a assinatura do contrato (Status: `SIGNED`).

- ### Obras
  - [✅] Deve ser possível cadastrar uma Obra.
  - [✅] Deve ser possível listar as Obras da empresa.
  - [✅] Uma Obra pode ter múltiplos contratos vinculados.

<br/>

## RNFs (Requisitos Não-Funcionais)

- [✅] A aplicação será Multi-tenant (várias empresas de forma isolada).
- [✅] Padrão de projeto Clean Architecture.
- [✅] Os dados devem ser persistidos em um banco PostgreSQL.
- [✅] A aplicação deve ser conteinerizada utilizando Docker.
- [✅] As senhas dos usuários devem ser criptografadas (Bcrypt).
- [✅] Autenticação deve ser via JWT.

<br/>

## Melhorias Futuras (Backlog)

As seguintes melhorias foram mapeadas e registradas como débito técnico para manter a viabilidade do prazo atual:

- [ ] **Validação Estrita de Campos Dinâmicos:** Atualmente o endpoint de criação de contratos aceita o preenchimento em JSON de forma livre. O ideal é implementar uma validação estrita no back-end para comparar o payload enviado com a estrutura cadastrada nos `ContractTemplateField` (verificando presença de campos obrigatórios e tipos de dados).
- [ ] **Integração Avançada de Assinaturas:** Exigir coleta de IP, documentação ou selfie durante o webhook/rota pública de assinatura para validade jurídica estrita.
- [ ] **Gestão Financeira de Obras:** Evoluir a entidade de Obras para suportar orçamentos, centros de custo e cronograma físico-financeiro.
