import { Test, TestingModule } from '@nestjs/testing';
import { TelefoneService } from './telefones.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Telefone } from './entities/telefone.entity/telefone.entity';
import { NotFoundException } from '@nestjs/common';
import { Cliente } from './../clientes/entities/cliente.entity/cliente.entity';
import { Endereco } from './../enderecos/entities/endereco.entity/endereco.entity';

describe('TelefoneService', () => {
  let service: TelefoneService;
  let repository: Repository<Telefone>;

  const mockTelefone = {
    id: 1,
    codigo_pais: '55',
    codigo_area: '11',
    numero: '999999999',
    cliente: { id: 1 },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TelefoneService,
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

    service = module.get<TelefoneService>(TelefoneService);
    repository = module.get<Repository<Telefone>>(getRepositoryToken(Telefone));
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  it('deve criar um telefone', async () => {
    jest.spyOn(repository, 'create').mockReturnValue(mockTelefone as Telefone);
    jest.spyOn(repository, 'save').mockResolvedValue(mockTelefone as Telefone);

    expect(await service.create(mockTelefone)).toEqual(mockTelefone);
  });

  it('deve atualizar um telefone', async () => {
    jest
      .spyOn(repository, 'findOne')
      .mockResolvedValue(mockTelefone as Telefone);
    jest.spyOn(repository, 'save').mockResolvedValue(mockTelefone as Telefone);

    const updatedTelefone = await service.update(1, { numero: '999999999' });
    expect(updatedTelefone).toEqual({
      message: 'Telefone atualizado com sucesso!',
    });
  });

  it('deve remover um telefone', async () => {
    const telefoneId = 1;
    const telefone = { id: telefoneId } as Telefone;

    jest.spyOn(repository, 'findOne').mockResolvedValue(telefone);

    jest.spyOn(repository, 'delete').mockResolvedValue({ affected: 1 } as any);

    const result = await service.remove(telefoneId);
    expect(result).toEqual({ message: 'Telefone removido com sucesso!' });

    expect(repository.findOne).toHaveBeenCalledWith({
      where: { id: telefoneId },
    });
    expect(repository.delete).toHaveBeenCalledWith(telefoneId);
  });

  it('deve lançar erro ao tentar remover telefone inexistente', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(null);

    await expect(service.remove(999)).rejects.toThrow(NotFoundException);
  });
});
