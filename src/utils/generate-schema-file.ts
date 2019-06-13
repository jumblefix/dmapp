import fs from 'fs';
import { printSchema } from 'graphql';
import path from 'path';
import { createSchema } from './create-schema';

(async () => {
  const schema = await createSchema();
  const sdl = printSchema(schema);
  const dir = path.join(__dirname, '../', 'graphql', 'schema.graphql');
  await fs.writeFile(dir, sdl, err => {
    console.log(err);
    process.exit();
  });
})();
