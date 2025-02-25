import { Test, TestingModule } from '@nestjs/testing';
import { TelefonesService } from './telefones.service';

describe('TelefonesService', () => {
  let service: TelefonesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TelefonesService],
    }).compile();

    service = module.get<TelefonesService>(TelefonesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
