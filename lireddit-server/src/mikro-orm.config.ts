import { __prod__ } from './constants';
import { Post } from './entities/Post';
import { Account } from './entities/Account';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';

if (!__prod__) {
  // load dev environment vars
  require('dotenv').config();
}

console.log(process.env.dbPassword);

export default {
  dbName: 'lireddit',
  debug: !__prod__,
  entities: [Post, Account],
  migrations: {
    path: path.join(__dirname, './migrations'), // path to the folder with migrations
    pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
  },
  type: 'postgresql',
  user: process.env.dbUser,
  password: process.env.dbPassword,
} as Parameters<typeof MikroORM.init>[0];
