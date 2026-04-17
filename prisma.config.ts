// Prisma 7 config (TypeScript)
import 'dotenv/config';
import { defineConfig, env } from '@prisma/config';

export default defineConfig({
  schema: './prisma/schema.prisma',
  datasource: {
    url: env('DATABASE_URL'),
    // Prisma config only accepts url/shadowDatabaseUrl here; direct connection is handled via env in schema.
  },
});
