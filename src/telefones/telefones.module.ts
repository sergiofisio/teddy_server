import { Module } from '@nestjs/common';
import { TelefonesService } from './telefones.service';
import { TelefonesController } from './telefones.controller';

@Module({
  providers: [TelefonesService],
  controllers: [TelefonesController]
})
export class TelefonesModule {}
