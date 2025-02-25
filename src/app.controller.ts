import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getInitMessage(): string {
    return '🚀 API Teddy está rodando! Acesse /api para ver a documentação.';
  }
}
