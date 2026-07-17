import { fakerPT_BR as faker } from '@faker-js/faker';

export interface UserPayload {
  nome: string;
  email: string;
  password: string;
  administrador: 'true' | 'false';
}

export class UserFactory {
  static create(
    overrides: Partial<UserPayload> = {}
  ): UserPayload {
    const uniqueId = `${Date.now()}-${faker.string.alphanumeric(6)}`;

    return {
      nome: faker.person.fullName(),
      email: `qa.carrefour.${uniqueId}@teste.com`,
      password: `Qa@${faker.string.alphanumeric(10)}`,
      administrador: 'false',
      ...overrides,
    };
  }

  static createAdmin(
    overrides: Partial<UserPayload> = {}
  ): UserPayload {
    return this.create({
      administrador: 'true',
      ...overrides,
    });
  }
}