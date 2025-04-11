import { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';

const logger = (req: Request, _res: Response, next: NextFunction) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.path;

  console.log(
    `${chalk.bgBlue.black(timestamp)} ${chalk.green(method)} ${chalk.yellow(path)}`
  );
  next();
};

export default logger;
