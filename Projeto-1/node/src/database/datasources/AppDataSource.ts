import { DataSource } from "typeorm";

const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  logging: true,
  port: 5433,
  username: "postgres",
  password: "docker",
  database: "gostack_gobarber",
  synchronize: true,
  entities: [
    "../../models/*.ts"
  ],
  migrations: [
    "./src/database/migrations/*.ts"
  ],
});

export default appDataSource;
