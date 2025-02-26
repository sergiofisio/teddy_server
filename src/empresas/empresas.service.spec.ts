import { Test, TestingModule } from '@nestjs/testing';
import { EmpresaService } from './empresas.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity/empresa.entity';
import { Cliente } from './../clientes/entities/cliente.entity/cliente.entity';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateEmpresaDto } from './../dto/create-empresa.dto/create-empresa.dto';

describe('EmpresaService', () => {
  let service: EmpresaService;
  let empresaRepository: Repository<Empresa>;
  let clienteRepository: Repository<Cliente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EmpresaService,
        {
          provide: getRepositoryToken(Empresa),
          useClass: Repository, // 🔹 Adicionando mock do `Repository<Empresa>`
        },
        {
          provide: getRepositoryToken(Cliente),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<EmpresaService>(EmpresaService);
    empresaRepository = module.get<Repository<Empresa>>(
      getRepositoryToken(Empresa),
    );
    clienteRepository = module.get<Repository<Cliente>>(
      getRepositoryToken(Cliente),
    );
  });

  it('deve ser definido', () => {
    expect(service).toBeDefined();
  });

  describe('createWithCliente', () => {
    it('deve criar uma empresa para um cliente', async () => {
      const clienteId = 1;
      const createEmpresaDto: CreateEmpresaDto = {
        nome: 'Empresa Exemplo',
        cnpj: '12345678000199',
        valor: 1000000.0,
      };

      const cliente = { id: clienteId } as Cliente;
      jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(cliente);
      jest.spyOn(empresaRepository, 'create').mockReturnValue({
        id: 1,
        cliente,
        ...createEmpresaDto,
      } as Empresa);
      jest.spyOn(empresaRepository, 'save').mockResolvedValue({
        id: 1,
        cliente,
        ...createEmpresaDto,
      } as Empresa);

      const result = await service.createWithCliente(
        clienteId,
        createEmpresaDto,
      );
      expect(result).toEqual({ id: 1, cliente, ...createEmpresaDto });

      expect(clienteRepository.findOne).toHaveBeenCalledWith({
        where: { id: clienteId },
      });
      expect(empresaRepository.create).toHaveBeenCalledWith({
        ...createEmpresaDto,
        cliente,
      });
      expect(empresaRepository.save).toHaveBeenCalled();
    });

    it('deve lançar erro ao tentar criar empresa para um cliente inexistente', async () => {
      jest.spyOn(clienteRepository, 'findOne').mockResolvedValue(null);

      await expect(
        service.createWithCliente(999, {} as CreateEmpresaDto),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('deve atualizar uma empresa existente', async () => {
      const empresaId = 1;
      const updateEmpresaDto: Partial<CreateEmpresaDto> = {
        nome: 'Nova Empresa',
      };

      const empresa = { id: empresaId } as Empresa;
      jest.spyOn(empresaRepository, 'findOne').mockResolvedValue(empresa);
      jest
        .spyOn(empresaRepository, 'save')
        .mockResolvedValue({ ...empresa, ...updateEmpresaDto });

      const result = await service.update(empresaId, updateEmpresaDto);
      expect(result).toEqual({ message: 'Empresa atualizada com sucesso!' });

      expect(empresaRepository.save).toHaveBeenCalled();
    });

    it('deve lançar erro ao tentar atualizar uma empresa inexistente', async () => {
      jest.spyOn(empresaRepository, 'findOne').mockResolvedValue(null);

      await expect(service.update(999, {})).rejects.toThrow(NotFoundException);
    });

    it('deve lançar erro ao tentar atualizar uma empresa com CNPJ duplicado', async () => {
      const empresaId = 1;
      const updateEmpresaDto: Partial<CreateEmpresaDto> = {
        cnpj: '12345678000199',
      };

      jest
        .spyOn(empresaRepository, 'findOne')
        .mockResolvedValue({ id: 2 } as Empresa);

      await expect(service.update(empresaId, updateEmpresaDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('remove', () => {
    it('deve remover uma empresa existente', async () => {
      const empresaId = 1;

      // Simula um delete bem-sucedido
      jest
        .spyOn(empresaRepository, 'delete')
        .mockResolvedValue({ affected: 1 } as any);

      const result = await service.remove(empresaId);
      expect(result).toEqual({ message: 'Empresa removida com sucesso!' });

      expect(empresaRepository.delete).toHaveBeenCalledWith(empresaId);
    });

    it('deve lançar erro ao tentar remover uma empresa inexistente', async () => {
      jest
        .spyOn(empresaRepository, 'delete')
        .mockResolvedValue({ affected: 0 } as any);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
