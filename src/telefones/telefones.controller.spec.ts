import { Test, TestingModule } from '@nestjs/testing';
import { TelefoneController } from './telefones.controller';
import { TelefoneService } from './telefones.service';
import { NotFoundException } from '@nestjs/common';
import { CreateTelefoneDto } from './../dto/create-telefone.dto/create-telefone.dto';

describe('TelefoneController', () => {
  let controller: TelefoneController;
  let service: TelefoneService;

  beforeEach(async () => {
    const mockTelefoneService = {
      createWithCliente: jest.fn().mockImplementation((clienteId, dto) => ({
        id: 1,
        clienteId,
        ...dto,
      })),
      update: jest
        .fn()
        .mockResolvedValue({ message: 'Telefone atualizado com sucesso!' }),
      remove: jest
        .fn()
        .mockResolvedValue({ message: 'Telefone removido com sucesso!' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [TelefoneController],
      providers: [
        {
          provide: TelefoneService,
          useValue: mockTelefoneService,
        },
      ],
    }).compile();

    controller = module.get<TelefoneController>(TelefoneController);
    service = module.get<TelefoneService>(TelefoneService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('createTelefone', () => {
    it('deve criar um telefone com clienteId', async () => {
      const clienteId = 1;
      const createTelefoneDto: CreateTelefoneDto = {
        codigo_pais: '55',
        codigo_area: '11',
        numero: '999999999',
      };

      const result = await controller.createTelefone(
        clienteId,
        createTelefoneDto,
      );
      expect(result).toEqual({
        id: 1,
        clienteId,
        ...createTelefoneDto,
      });

      expect(service.createWithCliente).toHaveBeenCalledWith(
        clienteId,
        createTelefoneDto,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar um telefone', async () => {
      const telefoneId = 1;
      const updateTelefoneDto: Partial<CreateTelefoneDto> = {
        numero: '888888888',
      };

      const result = await controller.update(telefoneId, updateTelefoneDto);
      expect(result).toEqual({ message: 'Telefone atualizado com sucesso!' });
      expect(service.update).toHaveBeenCalledWith(
        telefoneId,
        updateTelefoneDto,
      );
    });
  });

  describe('remove', () => {
    it('deve remover um telefone', async () => {
      const telefoneId = 1;

      const result = await controller.remove(telefoneId);
      expect(result).toEqual({ message: 'Telefone removido com sucesso!' });

      expect(service.remove).toHaveBeenCalledWith(telefoneId);
    });

    it('deve retornar erro ao tentar remover um telefone inexistente', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new NotFoundException('Telefone não encontrado'));

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
