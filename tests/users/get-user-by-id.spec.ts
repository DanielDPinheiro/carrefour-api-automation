import { test, expect } from '@playwright/test';

import { UserFactory } from '../../src/factories/UserFactory';
import { UserService } from '../../src/services/UserService';

test.describe('Usuários - GET por ID', () => {
  let userService: UserService;
  let createdUserId: string | undefined;

  test.beforeEach(async () => {
    userService = new UserService();
    await userService.init();
  });

  test.afterEach(async () => {
    if (createdUserId) {
      await userService.delete(createdUserId);
    }

    await userService.dispose();
  });

  test('GET /usuarios/{id} deve retornar o usuário cadastrado', async () => {
    const user = UserFactory.create();

    const createResponse = await userService.create(user);

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();
    createdUserId = createBody._id;

    const response = await userService.findById(createdUserId!);

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body._id).toBe(createdUserId);
    expect(body.nome).toBe(user.nome);
    expect(body.email).toBe(user.email);
    expect(body.password).toBe(user.password);
    expect(body.administrador).toBe(user.administrador);
  });
});