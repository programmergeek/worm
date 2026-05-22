interface WormDatabaseClientPlugin {}

export interface WormConfigOptions {
  client: WormDatabaseClientPlugin;
  schema?: string;
  query?: string;
  out?: string;
}

export default async function createConfig(options: WormConfigOptions) {
  return { ...options };
}
