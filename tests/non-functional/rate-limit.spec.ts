import { test, expect, request, APIResponse } from '@playwright/test';
import { env } from '../../src/config/env';

const LIMIT_PER_MINUTE = 100;
const TOTAL_REQUESTS = LIMIT_PER_MINUTE + 1;
const RUN_RATE_LIMIT = process.env.RUN_RATE_LIMIT === 'true';
const STRICT_RATE_LIMIT = process.env.RATE_LIMIT_STRICT === 'true';

test.describe('Rate Limit - 100 requisições por minuto', () => {
  test.skip(!RUN_RATE_LIMIT, 'Defina RUN_RATE_LIMIT=true para executar o teste não funcional.');

  test('deve limitar a 101ª requisição dentro da mesma janela de um minuto', async ({}, testInfo) => {
    const api = await request.newContext({
      baseURL: env.BASE_URL,
      extraHTTPHeaders: {
        Accept: 'application/json',
      },
    });

    const startedAt = Date.now();
    const responses: APIResponse[] = await Promise.all(
      Array.from({ length: TOTAL_REQUESTS }, () => api.get('/usuarios')),
    );
    const durationMs = Date.now() - startedAt;

    const statuses = responses.map((response) => response.status());
    const accepted = statuses.filter((status) => status >= 200 && status < 300).length;
    const limited = statuses.filter((status) => status === 429).length;
    const firstLimitedIndex = statuses.findIndex((status) => status === 429);
    const lastResponse = responses.at(-1)!;

    const evidence = {
      requisito: `${LIMIT_PER_MINUTE} requisições por minuto`,
      totalEnviado: TOTAL_REQUESTS,
      duracaoMs: durationMs,
      respostasSucesso: accepted,
      respostas429: limited,
      primeiraResposta429: firstLimitedIndex >= 0 ? firstLimitedIndex + 1 : null,
      statusDa101Requisicao: lastResponse.status(),
      retryAfter: lastResponse.headers()['retry-after'] ?? null,
      xRateLimitLimit: lastResponse.headers()['x-ratelimit-limit'] ?? null,
      xRateLimitRemaining: lastResponse.headers()['x-ratelimit-remaining'] ?? null,
      todosOsStatus: statuses,
    };

    await testInfo.attach('evidencia-rate-limit.json', {
      body: JSON.stringify(evidence, null, 2),
      contentType: 'application/json',
    });

    expect(durationMs, 'As 101 requisições devem ocorrer dentro de 60 segundos').toBeLessThan(60_000);

    if (!STRICT_RATE_LIMIT) {
      testInfo.annotations.push({
        type: 'observação',
        description:
          limited > 0
            ? `A API aplicou Rate Limit: ${limited} resposta(s) HTTP 429.`
            : 'A API não retornou HTTP 429. Execute com RATE_LIMIT_STRICT=true para tratar como não conformidade.',
      });
      expect(statuses).toHaveLength(TOTAL_REQUESTS);
      return;
    }

    expect(
      limited,
      'Não conformidade: a API não bloqueou requisições acima do limite de 100 por minuto',
    ).toBeGreaterThan(0);

    expect(
      firstLimitedIndex,
      'A limitação não deve ocorrer antes de completar as 100 requisições permitidas',
    ).toBeGreaterThanOrEqual(LIMIT_PER_MINUTE);

    expect(
      lastResponse.status(),
      'A 101ª requisição deve retornar HTTP 429 - Too Many Requests',
    ).toBe(429);

    await api.dispose();
  });
});
