import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoController } from './enderecos.controller';
import { EnderecoService } from './enderecos.service';
import { NotFoundException } from '@nestjs/common';
import { CreateEnderecoDto } from './../dto/create-endereco.dto/create-endereco.dto';

describe('EnderecoController', () => {
  let controller: EnderecoController;
  let service: EnderecoService;

  beforeEach(async () => {
    const mockEnderecoService = {
      createWithCliente: jest.fn().mockImplementation((clienteId, dto) => ({
        id: 1,
        clienteId,
        ...dto,
      })),
      update: jest
        .fn()
        .mockResolvedValue({ message: 'Endereço atualizado com sucesso!' }),
      remove: jest
        .fn()
        .mockResolvedValue({ message: 'Endereço removido com sucesso!' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [EnderecoController],
      providers: [
        {
          provide: EnderecoService,
          useValue: mockEnderecoService,
        },
      ],
    }).compile();

    controller = module.get<EnderecoController>(EnderecoController);
    service = module.get<EnderecoService>(EnderecoService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  describe('createEndereco', () => {
    it('deve criar um endereço para um cliente', async () => {
      const clienteId = 1;
      const createEnderecoDto: CreateEnderecoDto = {
        logradouro: 'Rua Teste',
        numero: '123',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
        complemento: 'Apto 101',
      };

      const result = await controller.createEndereco(
        clienteId,
        createEnderecoDto,
      );
      expect(result).toEqual({
        id: 1,
        clienteId,
        ...createEnderecoDto,
      });

      expect(service.createWithCliente).toHaveBeenCalledWith(
        clienteId,
        createEnderecoDto,
      );
    });
  });

  describe('update', () => {
    it('deve atualizar um endereço', async () => {
      const enderecoId = 1;
      const updateEnderecoDto: Partial<CreateEnderecoDto> = {
        logradouro: 'Avenida Paulista',
      };

      const result = await controller.update(enderecoId, updateEnderecoDto);
      expect(result).toEqual({ message: 'Endereço atualizado com sucesso!' });

      expect(service.update).toHaveBeenCalledWith(
        enderecoId,
        updateEnderecoDto,
      );
    });
  });

  describe('remove', () => {
    it('deve remover um endereço', async () => {
      const enderecoId = 1;

      const result = await controller.remove(enderecoId);
      expect(result).toEqual({ message: 'Endereço removido com sucesso!' });

      expect(service.remove).toHaveBeenCalledWith(enderecoId);
    });

    it('deve retornar erro ao tentar remover um endereço inexistente', async () => {
      jest
        .spyOn(service, 'remove')
        .mockRejectedValue(new NotFoundException('Endereço não encontrado'));

      await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
