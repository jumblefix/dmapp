// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
const iconv = require('iconv-lite');
// tslint:disable-next-line:no-var-requires
const encodings = require('iconv-lite/encodings');
iconv.encodings = encodings;
import * as path from 'path';
import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { ConnectionList } from '~types/types';

const {
  DB_HOST,
  DB_PORT,
  DB_NAME_DEV,
  DB_NAME_PROD,
  DB_NAME_TEST,
  DB_TYPE,
  ROOT_USER,
  ROOT_PASS,
  NODE_ENV,
} = process.env;

const connectionList: ConnectionList = {
  development: {
    name: 'development',
    type: 'sqlite',
    database: path.join(__dirname, '../', '../', 'data', 'db.sqlite'),
    synchronize: true,
    logging: false,
    entities: ['src/api/entity/**/*.*'],
    migrations: ['src/api/migration/**/*.*'],
    subscribers: ['src/api/subscriber/**/*.*'],
    cli: {
      entitiesDir: 'src/api/entity',
      migrationsDir: 'src/api/migration',
      subscribersDir: 'src/api/subscriber',
    },
  },
  test: {
    name: 'test',
    type: 'sqlite',
    database: path.join(__dirname, '../', '../', 'data', 'test.sqlite'),
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: ['src/api/entity/**/*.ts'],
    migrations: ['src/api/migration/**/*.ts'],
    subscribers: ['src/api/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/api/entity',
      migrationsDir: 'src/api/migration',
      subscribersDir: 'src/api/subscriber',
    },
  },
  production: {
    name: 'production',
    type: 'sqlite',
    database: path.join(__dirname, '../', '../', 'data', 'prod.sqlite'),
    synchronize: false,
    logging: false,
    entities: ['src/api/entity/**/*.ts'],
    migrations: ['src/api/migration/**/*.ts'],
    subscribers: ['src/api/subscriber/**/*.ts'],
  },
  root: {
    name: 'root',
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: ROOT_USER,
    password: ROOT_PASS,
  },
};

export async function createDb() {
  const connectionOptions = connectionList.root;
  const rootConnection = await createConnection({
    ...connectionOptions,
    name: 'default',
  });

  let dbName: string;
  if (NODE_ENV === 'test') {
    dbName = DB_NAME_TEST as string;
  } else if (NODE_ENV === 'development') {
    dbName = DB_NAME_DEV as string;
  } else {
    dbName = DB_NAME_PROD as string;
  }

  const grantQ =
    // tslint:disable-next-line:prefer-template
    'GRANT ALL ON ' + dbName + '.* TO `' + process.env.DB_USER + '`@`%`;';

  await rootConnection
    .query(`CREATE DATABASE IF NOT EXISTS ${dbName};`)
    .then(async () => {
      await rootConnection.query(grantQ);
      await rootConnection.close();
    });
}

export async function connectDb() {
  let retries = 5;
  while (retries) {
    try {
      const options = connectionList[
        (NODE_ENV || 'development') as string
      ] as any;
      return createConnection({
        ...options,
        name: 'default',
      });
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  return null;
}

export async function connectTestDb(
  drop: boolean = false,
): Promise<Connection> {
  const options = connectionList.test;

  const c = getConnectionManager();
  if (c.has('default')) {
    return c.get('default');
  }

  return createConnection({
    ...options,
    synchronize: drop,
    dropSchema: drop,
    name: 'default',
  });
}
