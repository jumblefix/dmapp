require('ts-node').register();
const { connectTestDb } = require('./src/api/db');

module.exports = async () => {
  const c = connectTestDb(true);
  global.__DB__ = c;
  return c;
};
