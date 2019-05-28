import { createDb } from '~api/db';

createDb()
  .then()
  .catch(err => console.log(err));
