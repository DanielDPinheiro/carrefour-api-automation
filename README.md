# Automação de Testes de API — Banco Carrefour

Projeto ajustado para atender ao desafio utilizando **Postman como ferramenta principal**, **Newman para execução automática**, **GitHub Actions como CI** e relatórios publicados como artefatos. A suíte Playwright/TypeScript existente foi preservada como regressão adicional.

## O que foi implementado

- Collection Postman com CRUD completo de usuários.
- Dados únicos gerados automaticamente em cada execução.
- Criação de administrador, login e captura automática do token.
- Cenários positivos e negativos.
- Execução sem intervenção por `npm run api:test`.
- Relatórios HTML, JSON e JUnit/XML.
- Pipeline GitHub Actions com upload dos relatórios como artefatos.
- Atalho Windows `EXECUTAR_TESTES_API.bat`.

## Instalação

Use Node.js 22 LTS:

```powershell
npm install
```

## Executar os testes Postman

No terminal:

```powershell
npm run api:test
```

Executar e abrir o relatório HTML ao final:

```powershell
npm run api:test:local
```

Também é possível dar dois cliques em:

```text
EXECUTAR_TESTES_API.bat
```

O Postman Desktop não precisa estar aberto. A Collection é executada pelo Newman, da mesma maneira que será executada na pipeline.

## Relatórios gerados

```text
reports/postman/postman-report.html
reports/postman/postman-report.json
reports/postman/postman-report.xml
```

## Pipeline

O arquivo `.github/workflows/api-tests.yml` cria dois jobs:

1. **Postman / Newman** — executa a Collection e publica `postman-api-reports`.
2. **Playwright API regression** — executa a suíte atual e publica Playwright e Allure.

A etapa de upload usa `if: always()`, portanto o relatório é publicado mesmo quando algum teste falha. A pipeline fica vermelha para bloquear a entrega, mas as evidências continuam disponíveis.

No GitHub: **Actions → execução → Artifacts → postman-api-reports**.

## Cobertura da Collection

- GET `/usuarios`
- POST `/usuarios`
- POST `/login`
- GET `/usuarios/{id}`
- PUT `/usuarios/{id}`
- DELETE `/usuarios/{id}`
- E-mail duplicado
- Campos obrigatórios
- ID inválido
- Login inválido
- Validação da exclusão

> A ServeRest usa `/usuarios` e não exige JWT no CRUD de usuários. A Collection autentica em `/login` e valida a geração do token. A limitação de 100 requisições por minuto descrita no enunciado não é um contrato documentado da API pública sugerida; não foi criado um teste agressivo de 101 requisições contra o serviço compartilhado.

## Suíte Playwright preservada

```powershell
npm test
npm run typecheck
npm run allure:generate
npm run allure:open
```
# Automação de Testes de API
### Desafio Técnico – QA Automation

Este projeto foi desenvolvido como solução para o desafio técnico de Automação de Testes de API.

O objetivo foi criar uma suíte automatizada capaz de validar os principais fluxos da API, permitindo sua execução tanto localmente quanto através de uma pipeline de Integração Contínua (CI).

Além da suíte desenvolvida em **Playwright**, foi implementada uma **Collection Postman** executada via **Newman**, atendendo aos requisitos propostos no desafio e permitindo a geração automática de relatórios.

---

# Objetivo

O projeto busca automatizar os principais cenários da API utilizando uma estrutura organizada, de fácil manutenção e preparada para execução automatizada.

Os principais objetivos são:

- Automatizar os fluxos críticos da API;
- Validar cenários positivos e negativos;
- Executar toda a suíte sem intervenção manual;
- Gerar evidências da execução;
- Disponibilizar os resultados através da pipeline de CI.

---

# Tecnologias utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| Node.js | Ambiente de execução |
| TypeScript | Desenvolvimento da automação |
| Playwright | Testes automatizados e regressão |
| Postman | Collection da API |
| Newman | Execução automatizada da Collection |
| GitHub Actions | Pipeline de Integração Contínua |
| Faker | Geração dinâmica de massa de testes |
| Allure | Relatórios da suíte Playwright |

---

# Estrutura do projeto

```text
.
├── .github/
│   └── workflows/
│
├── postman/
│   ├── collections/
│   └── environments/
│
├── reports/
│
├── scripts/
│
├── src/
│   ├── clients/
│   ├── config/
│   ├── factories/
│   ├── schemas/
│   ├── services/
│   └── utils/
│
├── tests/
│
└── README.md
```

## Organização

A estrutura foi separada por responsabilidade para facilitar manutenção e evolução do projeto.

**clients**

Responsável pelas chamadas HTTP.

**services**

Centraliza as operações da API utilizadas pelos testes.

**factories**

Criação de massa dinâmica utilizada durante a execução.

**schemas**

Validação da estrutura das respostas.

**tests**

Cenários automatizados utilizando Playwright.

**postman**

Collection utilizada pelo Newman.

**reports**

Relatórios gerados automaticamente.

---

# Cenários automatizados

Durante a execução são validados os seguintes fluxos:

| ID | Cenário |
|----|----------|
| CT01 | Listar usuários |
| CT02 | Criar usuário administrador |
| CT03 | Login |
| CT04 | Buscar usuário por ID |
| CT05 | Atualizar usuário |
| CT06 | Validar atualização |
| CT07 | Validar e-mail duplicado |
| CT08 | Validar campos obrigatórios |
| CT09 | Buscar ID inexistente |
| CT10 | Login inválido |
| CT11 | Excluir usuário |
| CT12 | Validar exclusão |

Durante a execução a Collection realiza automaticamente:

- criação da massa de testes;
- autenticação na API;
- armazenamento do token JWT;
- reutilização do token nas próximas requisições;
- limpeza dos dados criados ao final da execução.

---

# Execução do projeto

## Pré-requisitos

Antes da execução é necessário possuir:

- Node.js instalado;
- npm;
- acesso à API utilizada no desafio.

Instalar as dependências:

```bash
npm ci
```

---

## Executar a Collection Postman

```bash
npm run api:test
```

Esse comando executa toda a Collection utilizando o Newman e gera automaticamente os relatórios da execução.

---

## Execução local com abertura automática do relatório

Durante o desenvolvimento foi criado um comando específico para facilitar a análise dos resultados:

```bash
npm run api:test:local
```

Além de executar toda a Collection, esse comando abre automaticamente o relatório HTML gerado pelo Newman no navegador padrão.

Isso permite validar rapidamente:

- quantidade de requisições executadas;
- cenários aprovados;
- cenários com falha;
- tempo total de execução;
- detalhes de cada requisição;
- assertions executadas.

Essa opção foi criada para facilitar o desenvolvimento local.

Na pipeline os relatórios são publicados automaticamente como artefatos.

---

## Executar a suíte Playwright

```bash
npm test
```

---

## Relatório Allure

Gerar o relatório:

```bash
npm run allure:generate
```

Abrir o relatório:

```bash
npm run allure:open
```

---

# Pipeline de Integração Contínua

O projeto possui uma pipeline configurada utilizando GitHub Actions.

Sempre que uma nova alteração é enviada ao repositório, o fluxo abaixo é executado automaticamente.

```text
Git Push
      │
      ▼
Checkout do Projeto
      │
      ▼
Instalação das Dependências
      │
      ▼
Execução da Collection Postman
      │
      ▼
Execução da Suíte Playwright
      │
      ▼
Geração dos Relatórios
      │
      ▼
Publicação dos Artefatos
```

Mesmo quando algum teste apresenta falha, os relatórios continuam sendo publicados para facilitar a análise da execução.

---

# Relatórios

Após cada execução são gerados automaticamente:

```text
reports/
├── postman-report.html
├── postman-report.json
└── postman-report.xml
```

Também são gerados os relatórios da suíte Playwright.

```text
playwright-report/

allure-report/
```

---

# Evidências

As evidências da execução podem ser consultadas através dos relatórios gerados localmente ou pelos artefatos da pipeline.

Sugestão de organização:

```text
docs/
└── evidencias/
    ├── pipeline.png
    ├── newman-report.png
    ├── postman-collection.png
    └── allure.png
```

---

# Boas práticas adotadas

Durante o desenvolvimento foram aplicadas algumas práticas para facilitar manutenção e reutilização da automação.

- Organização por responsabilidade;
- Massa de testes dinâmica;
- Reutilização automática do token JWT;
- Separação entre configuração e regras de negócio;
- Limpeza automática dos registros criados;
- Execução automatizada por linha de comando;
- Geração de relatórios em múltiplos formatos;
- Integração contínua utilizando GitHub Actions.

---

# Considerações finais

Este projeto foi desenvolvido buscando manter uma estrutura simples, organizada e de fácil manutenção.

Além de atender aos requisitos propostos no desafio, foram adicionadas melhorias voltadas à automação da execução, geração de evidências e integração contínua, simulando um fluxo próximo ao utilizado em projetos reais de QA.

---

# Autor

**Daniel D. Pinheiro**

Projeto desenvolvido para fins de avaliação técnica e demonstração de conhecimentos em Automação de Testes, APIs e Integração Contínua.