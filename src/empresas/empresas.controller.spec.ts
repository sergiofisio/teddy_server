import { Test, TestingModule } from '@nestjs/testing';
import { EmpresasController } from './empresas.controller';

describe('EmpresasController', () => {
  let controller: EmpresasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresasController],
    }).compile();

    controller = module.get<EmpresasController>(EmpresasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
