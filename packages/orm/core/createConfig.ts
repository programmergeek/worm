import fsPromises from "fs/promises";

interface WormDatabaseClientPlugin {}

export interface WormConfigOptions {
  driver: WormDatabaseClientPlugin;
  schema?: string;
  query?: string;
  out?: string;
}

export class WormConfigError extends Error {}

// the createConfig function exists simply as a way to aggregate and validate all of the information
// the compiler needs to function
export default async function createConfig(options: WormConfigOptions) {
  if (options.schema === undefined) {
    options.schema = "./schema.sql";
  }

  if (options.query === undefined) {
    options.query = "./query";
  }

  // validate the file locations are correct
  let foundFiles = false;
  let queryFiles = [] as string[];
  const queryRoot = (() => {
    if (options.query.endsWith("/")) {
      return options.query.substring(0, options.query.length - 1);
    }
    return options.query;
  })();
  try {
    await fsPromises.access(options.schema);
    queryFiles = await fsPromises.readdir(options.query);
    queryFiles.forEach(async (file) => {
      await fsPromises.access(queryRoot + "/" + file);
    });
    foundFiles = true;
  } catch (e) {
    console.error("Could not find files", e);
  }

  if (foundFiles === false) {
    throw new WormConfigError("");
  }

  // make sure files are not empty
  try {
    const schemaStat = await fsPromises.stat(options.schema);

    if (schemaStat.size === 0) {
    }

    queryFiles.forEach(async (file) => {
      const stats = await fsPromises.stat(queryRoot + "/" + file);
      if (stats.size === 0) {
        throw new WormConfigError("");
      }
    });
  } catch (e) {
    console.error("File is empty");
  }

  return { ...options };
}
