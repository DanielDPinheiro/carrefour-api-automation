import { test, expect } from '@playwright/test';

import { UserFactory } from '../../src/factories/UserFactory';
import { UserService } from '../../src/services/UserService';

test.describe('Usuários - DELETE', () => {
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

  test('DELETE /usuarios/{id} deve excluir um usuário existente', async () => {
    const user = UserFactory.create();

    const createResponse = await userService.create(user);

    expect(createResponse.status()).toBe(201);

    const createBody = await createResponse.json();
    createdUserId = createBody._id;

    const deleteResponse = await userService.delete(createdUserId!);

    expect(deleteResponse.status()).toBe(200);

    const deleteBody = await deleteResponse.json();

    expect(deleteBody).toHaveProperty(
      'message',
      'Registro excluído com sucesso'
    );

    const findResponse = await userService.findById(createdUserId!);

    expect(findResponse.status()).toBe(400);

    const findBody = await findResponse.json();

    expect(findBody).toHaveProperty(
      'message',
      'Usuário não encontrado'
    );

    createdUserId = undefined;
  });
});