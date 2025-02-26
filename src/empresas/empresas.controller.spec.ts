import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaController } from './empresas.controller';
import { EmpresaService } from './empresas.service';
import { NotFoundException } from '@nestjs/common';
import { CreateEmpresaDto } from './../dto/create-empresa.dto/create-empresa.dto';

describe('EmpresaController', () => {
  let controller: EmpresaController;
  let service: EmpresaService;

  beforeEach(async () => {
    const mockEmpresaService = {
      createWithCliente: jest.fn().mockImplementation((clienteId, dto) => ({
        id: 1,
        clienteId,
        ...dto,
      })),
      update: jest
        .fn()
        .mockResolvedValue({ message: 'Empresa atualizada com sucesso!' }),
      remove: jest
        .fn()
        .mockResolvedValue({ message: 'Empresa removida com sucesso!' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmpresaController],
      providers: [
        {
          provide: EmpresaService,
          useValue: mockEmpresaService,
        },
      ],
    }).compile();

    controller = module.get<EmpresaController>(EmpresaController);
    service = module.get<EmpresaService>(EmpresaService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('createEmpresa', () => {
    it('deve criar uma empresa para um cliente', async () => {
      const clienteId = 1;
      const createEmpresaDto: CreateEmpresaDto = {
        nome: 'Empresa Exemplo',
        cnpj: '12345678000199',
        valor: 1000000.0,
      };

      const result = await controller.createEmpresa(
        clienteId,
        createEmpresaDto,
      );
      expect(result).toEqual({
        id: 1,
        clienteId,
        ...createEmpresaDto,
      });

      expect(service.createWithCliente).toHaveBeenCalledWith(
        clienteId,
        createEmpresaDto,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar uma empresa', async () => {
      const empresaId = 1;
      const updateEmpresaDto: Partial<CreateEmpresaDto> = {
        nome: 'Nova Empresa',
      };

      const result = await controller.update(empresaId, updateEmpresaDto);
      expect(result).toEqual({ message: 'Empresa atualizada com sucesso!' });

      expect(service.update).toHaveBeenCalledWith(empresaId, updateEmpresaDto);
    });
  });

  describe('remove', () => {
    it('deve remover uma empresa', async () => {
      const empresaId = 1;

      const result = await controller.remove(empresaId);
      expect(result).toEqual({ message: 'Empresa removida com sucesso!' });

      expect(service.remove).toHaveBeenCalledWith(empresaId);
    });

    it('deve retornar erro ao tentar remover uma empresa inexistente', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new NotFoundException('Empresa não encontrada'));

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
