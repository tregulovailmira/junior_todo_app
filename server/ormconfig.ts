const config = {
  type: 'postgres',
  host: 'localhost',
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true,
  entities: [
    __dirname + '/src/modules/**/*.entity.ts',
    __dirname + '/dist/modules/**/*.entity.js',
  ],
  migrations: [process.env.DB_MIGRATIONS],
  cli: {
    entitiesDir: process.env.DB_ENTITIES_DIR,
    migrationsDir: process.env.DB_MIGRATIONS_DIR,
  },
};

export default config;
