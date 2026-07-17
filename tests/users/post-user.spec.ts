import { test, expect } from '@playwright/test';

import { UserFactory } from '../../src/factories/UserFactory';
import { UserService } from '../../src/services/UserService';

test.describe('Usuários - POST', () => {
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

  test('POST /usuarios deve criar um usuário com dados válidos', async () => {
    const user = UserFactory.create();

    const createResponse = await userService.create(user);

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();

    expect(createBody).toHaveProperty(
      'message',
      'Cadastro realizado com sucesso'
    );
    expect(createBody).toHaveProperty('_id');

    createdUserId = createBody._id;
    
    const findResponse = await userService.findById(createdUserId!);

    expect(findResponse.status()).toBe(200);

    const foundUser = await findResponse.json();

    expect(foundUser.nome).toBe(user.nome);
    expect(foundUser.email).toBe(user.email);
    expect(foundUser.administrador).toBe(user.administrador);
    expect(foundUser._id).toBe(createdUserId);
    expect(foundUser.password).toBe(user.password);
  });
});