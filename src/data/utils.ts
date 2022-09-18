import { User } from "./entities/User";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { DataSource } from "typeorm";
import { Judge } from "./entities/Judge";

const typeOrmConfig: PostgresConnectionOptions = {
  type: "postgres",
  host: process.env.DATA_HOST,
  port: Number(process.env.DATA_PORT),
  username: process.env.DATE_USERNAME,
  password: process.env.DATA_PASSWORD,
  database: process.env.DATA_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Judge],
};

const getOrm = () => {
  const AppDataSource = new DataSource(typeOrmConfig);
  return AppDataSource.initialize();
};

export { typeOrmConfig, getOrm };
