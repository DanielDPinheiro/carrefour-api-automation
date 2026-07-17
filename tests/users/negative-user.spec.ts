import { test, expect } from '@playwright/test';

import { UserFactory } from '../../src/factories/UserFactory';
import { UserService } from '../../src/services/UserService';

test.describe('Usuários - Cenários negativos', () => {
  let userService: UserService;
  let createdUserId: string | undefined;

  test.beforeEach(async () => {
    userService = new UserService();
    await userService.init();
  });

  test.afterEach(async () => {
    if (createdUserId) {
      const response = await userService.findById(createdUserId);

      if (response.status() === 200) {
        await userService.delete(createdUserId);
      }
    }

    await userService.dispose();
  });

  test('POST /usuarios não deve cadastrar e-mail duplicado', async () => {
    const user = UserFactory.create();

    const firstResponse = await userService.create(user);

    expect(firstResponse.status()).toBe(201);

    const firstBody = await firstResponse.json();
    createdUserId = firstBody._id;

    const duplicateResponse = await userService.create(user);

    expect(duplicateResponse.status()).toBe(400);

    const duplicateBody = await duplicateResponse.json();

    expect(duplicateBody).toHaveProperty(
      'message',
      'Este email já está sendo usado'
    );
  });

  test('GET /usuarios/{id} deve retornar erro para ID inexistente', async () => {
  const nonexistentId = '1234567890abcdef';

  const response = await userService.findById(nonexistentId);

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body).toHaveProperty(
    'message',
    'Usuário não encontrado'
  );
});

  test('GET /usuarios/{id} deve rejeitar ID com formato inválido', async () => {
  const response = await userService.findById('id-inexistente');

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body).toHaveProperty(
    'id',
    'id deve ter exatamente 16 caracteres alfanuméricos'
  );
});

  test('DELETE /usuarios/{id} deve tratar ID inexistente', async () => {
    const response = await userService.delete('id-inexistente');

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty(
      'message',
      'Nenhum registro excluído'
    );
  });
});