import dotenv from 'dotenv';

dotenv.config();

interface EnvConfig {
  PORT: number;
  NODE_ENV: string;
  DIRECTUS_URL: string;
  DIRECTUS_ADMIN_EMAIL: string;
  DIRECTUS_ADMIN_PASSWORD: string;
  JWT_SECRET: string;
}

const getEnvVariable = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const config: EnvConfig = {
  PORT: parseInt(getEnvVariable('PORT', '5000'), 10),
  NODE_ENV: getEnvVariable('NODE_ENV', 'development'),
  DIRECTUS_URL: getEnvVariable('DIRECTUS_URL'),
  DIRECTUS_ADMIN_EMAIL: getEnvVariable('DIRECTUS_ADMIN_EMAIL'),
  DIRECTUS_ADMIN_PASSWORD: getEnvVariable('DIRECTUS_ADMIN_PASSWORD'),
  JWT_SECRET: getEnvVariable('JWT_SECRET'),
};