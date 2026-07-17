# Automação de Testes de API — Banco Carrefour

Projeto de automação de testes de API desenvolvido com Playwright e TypeScript como parte de um desafio técnico para QA.

## Tecnologias

- Node.js
- TypeScript
- Playwright
- Faker
- dotenv
- Allure Report
- GitHub Actions

## Arquitetura

```text
src/
├── clients/
│   └── ApiClient.ts
├── config/
│   └── env.ts
├── factories/
│   └── UserFactory.ts
├── schemas/
├── services/
│   └── UserService.ts
└── utils/

tests/
├── health.spec.ts
└── users/
    ├── delete-user.spec.ts
    ├── get-user-by-id.spec.ts
    ├── get-users.spec.ts
    ├── negative-user.spec.ts
    ├── post-user.spec.ts
    └── put-user.spec.ts
```

## Cenários automatizados

### Positivos

- Listagem de usuários
- Cadastro de usuário
- Consulta de usuário por ID
- Atualização de usuário
- Exclusão de usuário
- Validação dos dados persistidos
- Limpeza dos registros criados durante os testes

### Negativos

- Tentativa de cadastro com e-mail duplicado
- Consulta de usuário inexistente
- Consulta utilizando ID fora do formato esperado
- Exclusão de registro inexistente

## Configuração

Crie um arquivo `.env` na raiz:

```env
BASE_URL=https://serverest.dev

EMAIL_ADMIN=
PASSWORD_ADMIN=
TOKEN=
```

O arquivo `.env` não é enviado ao repositório.

## Instalação

```bash
npm ci
```

## Execução

Executar toda a suíte:

```bash
npm test
```

Validar TypeScript e executar os testes:

```bash
npm run validate
```

Executar apenas os testes de usuários:

```bash
npm run test:users
```

Executar os cenários negativos:

```bash
npm run test:negative
```

## Relatório Playwright

```bash
npm run test:report
```

## Relatório Allure

Gerar o relatório:

```bash
npm run allure:generate
```

Abrir o relatório:

```bash
npm run allure:open
```

Também é possível gerar e servir temporariamente:

```bash
npm run allure:serve
```

## Integração contínua

O projeto possui pipeline no GitHub Actions para:

- instalar as dependências;
- validar o TypeScript;
- executar os testes;
- armazenar os relatórios como artefatos.

## Boas práticas aplicadas

- Separação entre cliente HTTP, serviços, configuração e dados de teste
- Dados dinâmicos com Faker
- Configuração por variáveis de ambiente
- Limpeza automática dos registros criados
- Cenários positivos e negativos
- Tipagem com TypeScript
- Execução paralela
- Relatórios Playwright e Allure
- Pipeline de integração contínua
