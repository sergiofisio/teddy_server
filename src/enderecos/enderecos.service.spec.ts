import { Test, TestingModule } from '@nestjs/testing';
import { EnderecoService } from './enderecos.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cliente } from './../clientes/entities/cliente.entity/cliente.entity';
import { Endereco } from './entities/endereco.entity/endereco.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateEnderecoDto } from './../dto/create-endereco.dto/create-endereco.dto';
import { Telefone } from './../telefones/entities/telefone.entity/telefone.entity';

describe('EnderecoService', () => {
  let service: EnderecoService;
  let enderecoRepository: Repository<Endereco>;
  let clienteRepository: Repository<Cliente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EnderecoService,
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

    service = module.get<EnderecoService>(EnderecoService);
    enderecoRepository = module.get<Repository<Endereco>>(
      getRepositoryToken(Endereco),
    );
    clienteRepository = module.get<Repository<Cliente>>(
      getRepositoryToken(Cliente),
    );
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('createWithCliente', () => {
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

      const cliente = { id: clienteId } as Cliente;

      jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(cliente);
      jest.spyOn(enderecoRepository, 'create').mockReturnValue({
        id: 1,
        cliente,
        ...createEnderecoDto,
      } as Endereco);
      jest.spyOn(enderecoRepository, 'save').mockResolvedValue({
        id: 1,
        cliente,
        ...createEnderecoDto,
      } as Endereco);

      const result = await service.createWithCliente(
        clienteId,
        createEnderecoDto,
      );
      expect(result).toEqual({ id: 1, cliente, ...createEnderecoDto });

      expect(clienteRepository.findOne).toHaveBeenCalledWith({
        where: { id: clienteId },
      });
      expect(enderecoRepository.create).toHaveBeenCalledWith({
        ...createEnderecoDto,
        cliente,
      });
      expect(enderecoRepository.save).toHaveBeenCalled();
    });

    it('deve lançar erro ao tentar criar endereço para um cliente inexistente', async () => {
      jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.createWithCliente(999, {} as CreateEnderecoDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar um endereço existente', async () => {
      const enderecoId = 1;
      const updateEnderecoDto: Partial<CreateEnderecoDto> = {
        logradouro: 'Avenida Paulista',
      };

      const endereco = { id: enderecoId } as Endereco;

      jest.spyOn(enderecoRepository, 'findOne').mockResolvedValue(endereco);
      jest
        .spyOn(enderecoRepository, 'save')
        .mockResolvedValue({ ...endereco, ...updateEnderecoDto });

      const result = await service.update(enderecoId, updateEnderecoDto);
      expect(result).toEqual({ message: 'Endereço atualizado com sucesso!' });

      expect(enderecoRepository.save).toHaveBeenCalled();
    });

    it('deve lançar erro ao tentar atualizar um endereço inexistente', async () => {
      jest.spyOn(enderecoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('deve remover um endereço existente', async () => {
      const enderecoId = 1;
      const endereco = { id: enderecoId } as Endereco;

      jest.spyOn(enderecoRepository, 'findOne').mockResolvedValue(endereco);

      jest
        .spyOn(enderecoRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove(enderecoId);
      expect(result).toEqual({ message: 'Endereço removido com sucesso!' });

      expect(enderecoRepository.findOne).toHaveBeenCalledWith({
        where: { id: enderecoId },
      });
      expect(enderecoRepository.delete).toHaveBeenCalledWith(enderecoId);
    });

    it('deve lançar erro ao tentar remover um endereço inexistente', async () => {
      // Simula que o endereço não foi encontrado
      jest.spyOn(enderecoRepository, 'findOne').mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
