import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './clientes.service';
import { Cliente } from './entities/cliente.entity/cliente.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateClienteDto } from '../dto/create-cliente.dto.ts/create-cliente.dto';
import { CreateEnderecoDto } from '../dto/create-endereco.dto/create-endereco.dto';
import { CreateTelefoneDto } from '../dto/create-telefone.dto/create-telefone.dto';
import { Telefone } from './../telefones/entities/telefone.entity/telefone.entity';
import { Endereco } from './../enderecos/entities/endereco.entity/endereco.entity';
import { CreateEmpresaDto } from './../dto/create-empresa.dto/create-empresa.dto';

describe('ClienteService', () => {
  let service: ClienteService;
  let clienteRepository: Repository<Cliente>;
  let telefoneRepository: Repository<Telefone>;
  let enderecoRepository: Repository<Endereco>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: getRepositoryToken(Cliente),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Telefone),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Endereco),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    clienteRepository = module.get<Repository<Cliente>>(
      getRepositoryToken(Cliente),
    );
    telefoneRepository = module.get<Repository<Telefone>>(
      getRepositoryToken(Telefone),
    );
    enderecoRepository = module.get<Repository<Endereco>>(
      getRepositoryToken(Endereco),
    );
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um cliente', async () => {
    const clienteDto: CreateClienteDto = {
      nome: 'João Silva',
      email: 'joao@email.com',
      cpf: '12345678900',
      salario: 5000,
      telefones: [
        {
          codigo_pais: '55',
          codigo_area: '11',
          numero: '999999999',
        } as CreateTelefoneDto,
      ],
      enderecos: [
        {
          logradouro: 'Rua A',
          numero: '100',
          bairro: 'Centro',
          cidade: 'São Paulo',
          estado: 'SP',
          cep: '01000-000',
        } as CreateEnderecoDto,
      ],
      empresas: [
        {
          nome: 'Empresa X',
          cnpj: '11222333000199',
          valor: 15000.0,
        } as CreateEmpresaDto,
      ],
    };

    jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(null);

    jest.spyOn(enderecoRepository, 'findOne').mockResolvedValue(null);

    const enderecoMock = { id: 1, ...clienteDto.enderecos[0] } as Endereco;
    jest.spyOn(enderecoRepository, 'create').mockReturnValue(enderecoMock);
    jest.spyOn(enderecoRepository, 'save').mockResolvedValue(enderecoMock);

    const clienteMock = { id: 1, ...clienteDto } as Cliente;
    jest.spyOn(clienteRepository, 'create').mockReturnValue(clienteMock);
    jest.spyOn(clienteRepository, 'save').mockResolvedValue(clienteMock);

    const telefoneMock = {
      id: 1,
      codigo_pais: '55',
      codigo_area: '11',
      numero: '999999999',
      cliente: clienteMock,
    } as Telefone;
    jest.spyOn(telefoneRepository, 'create').mockReturnValue(telefoneMock);
    jest.spyOn(telefoneRepository, 'save').mockResolvedValue(telefoneMock);

    const result = await service.create(clienteDto);
    expect(result).toEqual(clienteMock);
  });

  it('deve retornar erro ao tentar criar cliente com CPF já existente', async () => {
    const clienteDto: CreateClienteDto = {
      nome: 'João Silva',
      email: 'joao@email.com',
      cpf: '12345678900',
      salario: 5000,
      telefones: [],
      enderecos: [],
      empresas: [],
    };

    jest
      .spyOn(clienteRepository, 'findOne')
      .mockResolvedValue(clienteDto as any);

    await expect(service.create(clienteDto)).rejects.toThrow(ConflictException);
  });

  it('deve atualizar um cliente', async () => {
    const cliente = {
      id: 1,
      nome: 'Antigo',
      email: 'antigo@email.com',
      cpf: '12345678900',
      salario: 4000,
    };

    jest
      .spyOn(clienteRepository, 'findOne')
      .mockResolvedValue(cliente as Cliente);
    jest.spyOn(clienteRepository, 'save').mockResolvedValue(cliente as Cliente);

    const updatedCliente = await service.update(1, { nome: 'Novo Nome' });
    expect(updatedCliente.nome).toBe('Novo Nome');
  });

  it('deve remover um cliente', async () => {
    const cliente = { id: 1 };

    jest
      .spyOn(clienteRepository, 'findOne')
      .mockResolvedValue(cliente as Cliente);
    jest
      .spyOn(clienteRepository, 'remove')
      .mockResolvedValue(cliente as Cliente);

    const result = await service.remove(1);
    expect(result).toEqual({ message: 'Cliente removido com sucesso!' });
  });

  it('deve retornar erro ao remover um cliente inexistente', async () => {
    jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(null);
    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
