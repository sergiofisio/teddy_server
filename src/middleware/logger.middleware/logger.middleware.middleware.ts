import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    console.log(
      `🔗 URL: ${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`,
    );
    next();
  }
}
