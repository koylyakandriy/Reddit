import { Request, Response } from 'express';
import { Redis } from 'ioredis';
import { createUserLoader } from './utils/createUserLoader';
import {createUpdootLoader} from "./utils/createUpdootLoader";

export type MyContext = {
  req: Request & {
    // @ts-ignore
    session: Express.Session;
  };
  redis: Redis;
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  updootLoader: ReturnType<typeof createUpdootLoader>;
};
