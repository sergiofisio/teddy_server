import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './clientes.controller';
import { ClienteService } from './clientes.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateClienteDto } from './../dto/create-cliente.dto.ts/create-cliente.dto';
import { UpdateClienteDto } from './../dto/update-cliente.dto/update-cliente.dto';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  const mockCliente = {
    id: 1,
    nome: 'João Silva',
    email: 'joao@email.com',
    cpf: '12345678900',
    salario: 5000,
    telefones: [{ codigo_pais: '55', codigo_area: '11', numero: '999999999' }],
    enderecos: [
      {
        logradouro: 'Rua A',
        numero: '100',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01000-000',
      },
    ],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClienteService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockCliente),
            findAll: jest.fn().mockResolvedValue([mockCliente]),
            findOne: jest.fn().mockResolvedValue(mockCliente), // Corrigido
            update: jest
              .fn()
              .mockResolvedValue({ ...mockCliente, nome: 'Novo Nome' }),
            remove: jest
              .fn()
              .mockResolvedValue({ message: 'Cliente removido com sucesso!' }), // Retorna mensagem no remove
          },
        },
      ],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);
  });

  it('deve ser definido', () => {
    expect(controller).toBeDefined();
  });

  it('deve criar um cliente com sucesso', async () => {
    const clienteDto: CreateClienteDto = {
      nome: 'João Silva',
      email: 'joao@email.com',
      cpf: '12345678900',
      salario: 5000,
      telefones: [
        { codigo_pais: '55', codigo_area: '11', numero: '999999999' },
      ],
      enderecos: [
        {
          logradouro: 'Rua A',
          numero: '100',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01000-000',
        },
      ],
    };

    expect(await controller.create(clienteDto)).toEqual(mockCliente);
    expect(service.create).toHaveBeenCalledWith(clienteDto);
  });

  it('deve retornar erro ao tentar criar um cliente com CPF ou email já existente', async () => {
    jest
      .spyOn(service, 'create')
      .mockRejectedValue(new ConflictException('CPF ou Email já cadastrado.'));

    const clienteDto: CreateClienteDto = {
      nome: 'João Silva',
      email: 'joao@email.com',
      cpf: '12345678900',
      salario: 5000,
      telefones: [],
      enderecos: [],
    };

    await expect(controller.create(clienteDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('deve retornar todos os clientes', async () => {
    expect(await controller.findAll()).toEqual([mockCliente]);
    expect(service.findAll).toHaveBeenCalled();
  });

  it('deve retornar um cliente pelo ID', async () => {
    expect(await controller.findOne(1)).toEqual(mockCliente);
    expect(service.findOne).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro ao buscar um cliente inexistente', async () => {
    jest
      .spyOn(service, 'findOne')
      .mockRejectedValue(
        new NotFoundException(`Cliente com ID 999 não encontrado.`),
      );

    await expect(controller.findOne(999)).rejects.toThrow(NotFoundException);
  });

  it('deve atualizar um cliente com sucesso', async () => {
    const updateDto: UpdateClienteDto = { nome: 'Novo Nome' };
    expect(await controller.update(1, updateDto)).toEqual({
      ...mockCliente,
      nome: 'Novo Nome',
    });
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });

  it('deve lançar erro ao atualizar um cliente inexistente', async () => {
    jest
      .spyOn(service, 'update')
      .mockRejectedValue(
        new NotFoundException(`Cliente com ID 999 não encontrado.`),
      );
    await expect(controller.update(999, {})).rejects.toThrow(NotFoundException);
  });

  it('deve remover um cliente com sucesso', async () => {
    expect(await controller.remove(1)).toEqual({
      message: 'Cliente removido com sucesso!',
    });
    expect(service.remove).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro ao remover um cliente inexistente', async () => {
    jest
      .spyOn(service, 'remove')
      .mockRejectedValue(
        new NotFoundException(`Cliente com ID 999 não encontrado.`),
      );

    await expect(controller.remove(999)).rejects.toThrow(NotFoundException);
  });
});
