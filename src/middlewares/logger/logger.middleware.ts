import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log('🔗 URL:', url);
    console.log('📩 Método:', req.method);
    next();
  }
}
