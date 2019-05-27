require('ts-node').register({
  project: 'tsconfig.api.json',
});
const { connectTestDb } = require('./src/api/db');

module.exports = async () => {
  const c = connectTestDb(true);
  global.__DB__ = c;
  return c;
};
