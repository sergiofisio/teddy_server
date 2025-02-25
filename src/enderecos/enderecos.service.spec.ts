import { Test, TestingModule } from '@nestjs/testing';
import { EnderecosService } from './enderecos.service';

describe('EnderecosService', () => {
  let service: EnderecosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnderecosService],
    }).compile();

    service = module.get<EnderecosService>(EnderecosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
