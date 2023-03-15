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
import RedisStore from 'connect-redis'
import session from 'express-session';
import { createClient } from 'redis';
import { UserEntity } from './entities/UserEntity';
import { UserRouter } from './routes/UserRouter';
import { 
  PORT, 
  CORSORIGIN,
  COOKIE_NAME,
  COOKIE_SECRET,
  COOKIE_MAX_AGE
} from './utils/constants';

export const DI = {} as {
  server: http.Server;
  orm: MikroORM,
  em: EntityManager,
  userRepository: EntityRepository<UserEntity>,
}

// extending session types with my own as needed
declare module 'express-session' {
  interface SessionData {
    userid: String;
  }
}

export const app = express(); // server is exposed for the router

export const main = (async () => {
  // mikroORM dependency injection setup
  DI.orm = await MikroORM.init<PostgreSqlDriver>(mikroconfig);
  DI.em = DI.orm.em
  DI.userRepository = DI.orm.em.getRepository(UserEntity);
  app.use(express.json());
  app.use((_req, _res, next) => {
    RequestContext.create(DI.orm.em, next);
  });

  // cors options setup
  const corsOptions = {
    origin: CORSORIGIN,
    optionsSuccessStatus: 200
  }
  app.use(cors(corsOptions));

  // redis client setup
  const redisClient = createClient();
  redisClient.connect().catch(console.error);
  // pretty sure somethings wrong with RedisStore's type in '@types/connect-redis' here
  const redisStore = new (RedisStore as any)({
    client: redisClient,
    disableTouch: true, // timer doesn't get refreshed upon interaction
  })
  // cookie settings
  let sess = {
    name: COOKIE_NAME,
    store: redisStore,
    resave: false, // don't reset session with every server request
    saveUninitialized: false, // save session even when data doesn't exists
    secret: COOKIE_SECRET,
    cookie: { 
      maxAge: COOKIE_MAX_AGE, // one hour
      httpOnly: true,
      secure: false 
    }
  }
  // secure cookies in production but allow testing in development
  if(app.get('env') === 'production') {
    app.set('trust proxy', 1) // first proxy is trusted
    sess.cookie.secure = true // serve secure cookies
  }
  app.use(session(sess));

  // declare routes
  app.use('/user', UserRouter);
  app.use('/index', (_req, res) => res.status(200).json({ message: 'index page'}));
  app.use((_req, res) => res.status(404).json({ message: 'Route not found'}));

  DI.server = app.listen(PORT, () => {
    console.log(`express server started on localhost:${PORT}`)
  })
})();
