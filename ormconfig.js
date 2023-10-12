module.exports = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  },
  entities: [
    './src/modules/users/entities/*.ts',
    './src/modules/users/entities/*.ts'
  ],
  migrations: [
    './src/shared/database/migrations/*.ts'
  ],
  cli: {
    migrationsDir: './src/shared/database/migrations'
  }
}
