import { ApiClient } from '../clients/ApiClient';
import { env } from '../config/env';
import type { UserPayload } from '../factories/UserFactory';

export class UserService {
  private readonly client = new ApiClient();

  async init(): Promise<void> {
    await this.client.init(env.BASE_URL);
  }

  async list() {
    return this.client.api.get('/usuarios');
  }

  async create(user: UserPayload) {
    return this.client.api.post('/usuarios', {
      data: user,
    });
  }

  async dispose(): Promise<void> {
    await this.client.dispose();
  }

  async findById(id: string) {
  return this.client.api.get(`/usuarios/${id}`);
}

async delete(id: string) {
  return this.client.api.delete(`/usuarios/${id}`);
}

async update(id: string, user: UserPayload) {
  return this.client.api.put(`/usuarios/${id}`, {
    data: user,
  });
}
}