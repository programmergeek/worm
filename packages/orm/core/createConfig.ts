import pg, { type ClientConfig, PoolConfig } from "pg";

export interface WormConfigOptions {
  returnErrorAsValue?: boolean;
  enablePool?: boolean;
  poolOptions?: Omit<
    PoolConfig,
    "user" | "password" | "host" | "port" | "database"
  >;
  clientOptions?: Omit<
    ClientConfig,
    "user" | "password" | "host" | "port" | "database"
  >;
}

interface PostgreSQLAuthOptions {
  user: string;
  password: string;
  host: string;
  database: string;
  port: number;
}

const DEFAULT_CONFIG: WormConfigOptions = {
  returnErrorAsValue: false,
  enablePool: true,
};

export function createConfig(
  db: string | PostgreSQLAuthOptions,
  options: WormConfigOptions,
) {
  const connectionString = (() => {
    if (typeof db === "string") {
      return db;
    }

    return `postgresql://${db.user}:${db.password}@${db.host}:${db.port}/${db.database}`;
  })();

  const { Client, Pool } = pg;

  const configOptions = {
    ...DEFAULT_CONFIG,
    ...options,
  };

  const client = (() => {
    if (options.enablePool) {
      return new Pool({
        connectionString,
        ...configOptions.poolOptions,
      });
    }

    return new Client({
      connectionString,
      ...configOptions.clientOptions,
    });
  })();

  return {
    client,
    compilerOptions: {
      returnErrorAsValue: options.returnErrorAsValue ?? false,
    },
  };
}
