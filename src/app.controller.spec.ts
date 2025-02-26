import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('checkServerStatus', () => {
    it('deve retornar { success: true }', () => {
      const result = controller.checkServerStatus();
      expect(result).toEqual({ success: true });
    });
  });
});
