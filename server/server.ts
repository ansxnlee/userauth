import http from "http";
import express from 'express';
import cors from 'cors';

import { 
  EntityManager, 
  EntityRepository, 
  MikroORM, 
  RequestContext 
} from "@mikro-orm/core"
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import mikroconfig from './mikro-orm.config';
import { UserEntity } from './entities/UserEntity';
import { UserRouter } from './routes/UserRouter';

import { PORT, CORSORIGIN } from './utils/constants';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<UserEntity>,
}

export const app = express();

export const main = (async () => {
  DI.orm = await MikroORM.init<PostgreSqlDriver>(mikroconfig);
  DI.em = DI.orm.em
  DI.userRepository = DI.orm.em.getRepository(UserEntity);

  app.use(express.json());

  app.use((_req, _res, next) => {
    RequestContext.create(DI.orm.em, next);
  });

  const corsOptions = {
    origin: CORSORIGIN,
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));

  app.use('/user', UserRouter);
  app.use('/index', (_req, res) => res.status(200).json({ message: 'index page'}));
  app.use((_req, res) => res.status(404).json({ message: 'Route not found'}));

  DI.server = app.listen(PORT, () => {
    console.log(`express server started on localhost:${PORT}`)
  })
})();
