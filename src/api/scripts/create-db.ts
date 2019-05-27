import { createDb } from '../db';

createDb()
  .then()
  .catch(err => console.log(err));
