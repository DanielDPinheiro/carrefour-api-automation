import { test, expect } from '@playwright/test';

import { UserFactory } from '../../src/factories/UserFactory';
import { UserService } from '../../src/services/UserService';

test.describe('Usuários - PUT', () => {
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

  test('PUT /usuarios/{id} deve atualizar um usuário existente', async () => {
    const originalUser = UserFactory.create();

    const createResponse = await userService.create(originalUser);

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();
    createdUserId = createBody._id;

    const updatedUser = UserFactory.create({
      email: originalUser.email,
      administrador: 'true',
    });

    const updateResponse = await userService.update(
      createdUserId!,
      updatedUser
    );

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    expect(updateBody).toHaveProperty(
      'message',
      'Registro alterado com sucesso'
    );

    const findResponse = await userService.findById(createdUserId!);

    expect(findResponse.status()).toBe(200);

    const foundUser = await findResponse.json();

    expect(foundUser._id).toBe(createdUserId);
    expect(foundUser.nome).toBe(updatedUser.nome);
    expect(foundUser.email).toBe(updatedUser.email);
    expect(foundUser.password).toBe(updatedUser.password);
    expect(foundUser.administrador).toBe(updatedUser.administrador);
  });
});