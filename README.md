# Automação de Testes de API
## Desafio Técnico – Banco Carrefour

Este projeto foi desenvolvido como solução para o desafio técnico de QA Automation, cujo objetivo é validar os principais fluxos de uma API utilizando testes automatizados, integração contínua e geração de relatórios de execução.

Para atender aos requisitos propostos foi implementada uma Collection Postman executada pelo Newman, responsável pela automação dos cenários de API e geração dos relatórios exigidos pelo desafio.

Além disso, a suíte existente em Playwright foi preservada como regressão complementar. Embora não fosse uma exigência do desafio, a decisão foi mantida por representar uma abordagem comum em projetos reais, onde diferentes ferramentas coexistem para atender necessidades distintas sem comprometer a organização da automação.

---

# Requisitos atendidos

| Requisito | Implementação |
|------------|---------------|
| CRUD completo | ✅ Collection Postman |
| Autenticação JWT | ✅ Login automatizado |
| Cobertura automatizada | ✅ 12 cenários |
| Integração Contínua | ✅ GitHub Actions |
| Relatórios | ✅ HTML, JSON e JUnit XML |
| Publicação de artefatos | ✅ GitHub Actions |

---

# Visão geral

A solução foi organizada para permitir que toda a suíte seja executada localmente ou pela pipeline de CI sem qualquer intervenção manual.

Durante a execução a suíte realiza automaticamente:

- criação da massa de testes;
- autenticação na API;
- captura e reutilização do token JWT;
- execução dos cenários positivos;
- execução dos cenários negativos;
- remoção dos registros criados;
- geração dos relatórios da execução.

Todo esse fluxo é reproduzido da mesma forma tanto localmente quanto no GitHub Actions.

---

# Tecnologias utilizadas

| Tecnologia | Finalidade |
|------------|------------|
| Node.js | Ambiente de execução |
| TypeScript | Desenvolvimento da suíte Playwright |
| Playwright | Regressão automatizada |
| Postman | Automação dos testes de API |
| Newman | Execução da Collection |
| GitHub Actions | Pipeline de Integração Contínua |
| Faker | Massa de testes dinâmica |
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
├── EXECUTAR_TESTES_API.bat
│
└── README.md
```

### Organização

A estrutura foi dividida por responsabilidade.

- **clients** concentra as chamadas HTTP.
- **services** centraliza as regras utilizadas pelos testes.
- **factories** gera dados dinâmicos utilizados durante a execução.
- **schemas** realiza validações de estrutura.
- **tests** contém a suíte Playwright.
- **postman** armazena a Collection e o Environment utilizados pelo Newman.
- **scripts** reúne utilitários auxiliares para execução da automação.

Essa separação facilita manutenção e reutilização dos componentes.

---

# Cobertura dos testes

A Collection cobre os principais fluxos funcionais da API.

| ID | Cenário |
|----|----------|
| CT01 | Listar usuários |
| CT02 | Criar usuário administrador |
| CT03 | Login |
| CT04 | Consultar usuário |
| CT05 | Atualizar usuário |
| CT06 | Validar atualização |
| CT07 | E-mail duplicado |
| CT08 | Campos obrigatórios |
| CT09 | ID inexistente |
| CT10 | Login inválido |
| CT11 | Excluir usuário |
| CT12 | Validar exclusão |

Os cenários contemplam tanto fluxos positivos quanto negativos, garantindo validação dos comportamentos esperados da API.

---

# Como executar

## Instalação

```bash
npm ci
```

---

## Executar Collection Postman

```bash
npm run api:test
```

Ao final da execução são gerados automaticamente:

- relatório HTML;
- relatório JSON;
- relatório JUnit XML.

---

## Execução local

```bash
npm run api:test:local
```

Além da execução da Collection, esse comando abre automaticamente o relatório HTML gerado pelo Newman no navegador padrão, facilitando a análise dos resultados durante o desenvolvimento.

Para facilitar execuções rápidas em ambiente Windows, também foi disponibilizado o script:

```text
EXECUTAR_TESTES_API.bat
```

O script automatiza a execução dos testes e permite que qualquer alteração realizada na automação seja validada rapidamente, sem a necessidade de executar comandos manualmente no terminal. Essa abordagem reduz o tempo de validação durante o desenvolvimento e padroniza a forma de execução entre diferentes ambientes Windows.

---

## Suíte Playwright

```bash
npm test
```

---

## Relatórios Allure

```bash
npm run allure:generate

npm run allure:open
```

---

# Pipeline

A pipeline do GitHub Actions executa automaticamente:

```text
Git Push

↓

Checkout

↓

Instalação das dependências

↓

Execução da Collection Postman

↓

Execução da suíte Playwright

↓

Geração dos relatórios

↓

Upload dos Artifacts
```

Mesmo quando ocorre falha em algum cenário, os relatórios continuam sendo publicados através de `if: always()`, permitindo análise completa da execução.

---

# Relatórios

A Collection Postman gera automaticamente:

- HTML
- JSON
- JUnit XML

A suíte Playwright gera:

- Playwright Report
- Allure Report

Os relatórios do Newman não são versionados no repositório. Durante a execução da pipeline eles são publicados automaticamente como Artifacts do GitHub Actions, seguindo a mesma abordagem utilizada em ambientes de Integração Contínua.

---

# Evolução do projeto

Durante o desenvolvimento algumas melhorias foram adicionadas além do escopo inicial do desafio.

As principais evoluções foram:

- inclusão da Collection Postman;
- integração com Newman;
- geração de múltiplos formatos de relatório;
- abertura automática do relatório HTML em ambiente local;
- pipeline GitHub Actions;
- publicação automática de artefatos;
- preservação da suíte Playwright como regressão complementar.

A decisão de manter ambas as abordagens foi intencional, demonstrando que ferramentas diferentes podem coexistir em um mesmo projeto, desde que cada uma possua uma responsabilidade bem definida.

---

# Considerações finais

O foco deste projeto foi atender integralmente aos requisitos do desafio mantendo uma estrutura simples, organizada e de fácil manutenção.

Embora o desafio pudesse ser resolvido utilizando apenas uma ferramenta de automação, optou-se por preservar a suíte Playwright existente e adicionar a Collection Postman como solução principal para os testes de API.

Essa decisão demonstra uma preocupação não apenas em cumprir os requisitos propostos, mas também em manter uma base de testes preparada para evolução e reutilização.

- disponibilização de um script Windows para padronizar a execução local da suíte.
---

# Autor

**Daniel D. Pinheiro**

QA Automation • Testes de API • Postman • Newman • Playwright • TypeScript • GitHub Actions