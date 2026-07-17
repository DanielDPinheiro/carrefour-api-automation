import { APIRequestContext, request } from '@playwright/test';

export class ApiClient {
  private context!: APIRequestContext;

  async init(baseURL: string) {
    this.context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        Accept: 'application/json'
      }
    });
  }

  get api() {
    return this.context;
  }

  async dispose() {
    await this.context.dispose();
  }
}