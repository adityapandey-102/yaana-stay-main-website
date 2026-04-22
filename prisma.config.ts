import { config } from 'dotenv'
import { defineConfig } from 'prisma/config'
import { resolve } from 'path'

config({ path: resolve(__dirname, '.env.local') })
config({ path: resolve(__dirname, '.env') })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // Migrations should use a direct Postgres connection instead of the pooled runtime URL.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL!,
  },
})
