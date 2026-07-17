import { test, expect } from '@playwright/test';
import { UserService } from '../../src/services/UserService';

test.describe('Usuários - GET', () => {
  let userService: UserService;

  test.beforeEach(async () => {
    userService = new UserService();
    await userService.init();
  });

  test.afterEach(async () => {
    await userService.dispose();
  });

  test('GET /usuarios deve retornar status 200', async () => {
    const response = await userService.list();

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty('quantidade');
    expect(body).toHaveProperty('usuarios');
    expect(Array.isArray(body.usuarios)).toBeTruthy();
    expect(body.quantidade).toBe(body.usuarios.length);
  });
});