import { Test, TestingModule } from '@nestjs/testing';
import { TelefonesController } from './telefones.controller';

describe('TelefonesController', () => {
  let controller: TelefonesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelefonesController],
    }).compile();

    controller = module.get<TelefonesController>(TelefonesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
