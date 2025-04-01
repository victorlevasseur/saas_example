import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'local_user',
  password: 'local_pwd',
  database: 'api',
  entities: ['src/app/**/*.entity.{ts,js}'],
  migrations: ['src/db/migrations/*.ts'],
});
