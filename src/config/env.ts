import dotenv from 'dotenv';

dotenv.config();

export const env = {
  BASE_URL: process.env.BASE_URL ?? '',
  EMAIL_ADMIN: process.env.EMAIL_ADMIN ?? '',
  PASSWORD_ADMIN: process.env.PASSWORD_ADMIN ?? '',
  TOKEN: process.env.TOKEN ?? ''
};

if (!env.BASE_URL) {
  throw new Error('BASE_URL não configurada no arquivo .env');
}