import {
  AbstractSqlConnection,
  AbstractSqlDriver,
  EntityManager,
} from '@mikro-orm/knex';
import { Request, Response } from 'express';

export type MyContext = {
  em: EntityManager<AbstractSqlDriver<AbstractSqlConnection>>;
  req: Request;
  res: Response;
};
