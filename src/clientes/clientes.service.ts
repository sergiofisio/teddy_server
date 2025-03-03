import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity/cliente.entity';
import { CreateClienteDto } from './../dto/create-cliente.dto.ts/create-cliente.dto';
import { Telefone } from './../telefones/entities/telefone.entity/telefone.entity';
import { Endereco } from './../enderecos/entities/endereco.entity/endereco.entity';
import { UpdateClienteDto } from './../dto/update-cliente.dto/update-cliente.dto';
import { Empresa } from './../empresas/entities/empresa.entity/empresa.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Telefone)
    private telefoneRepository: Repository<Telefone>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const { nome, email, cpf, salario, telefones, enderecos, empresas } =
      createClienteDto;

    const clienteExistente = await this.clienteRepository.findOne({
      where: [{ email }, { cpf }],
    });

    if (clienteExistente) {
      throw new ConflictException('CPF ou Email já cadastrado.');
    }

    const enderecosCriados = await Promise.all(
      enderecos.map(async (endereco) => {
        let enderecoExistente = await this.enderecoRepository.findOne({
          where: {
            logradouro: endereco.logradouro,
            numero: endereco.numero,
            cep: endereco.cep,
          },
        });

        if (!enderecoExistente) {
          enderecoExistente = this.enderecoRepository.create(endereco);
          await this.enderecoRepository.save(enderecoExistente);
        }
        return enderecoExistente;
      }),
    );

    const cliente = this.clienteRepository.create({
      nome,
      email,
      cpf,
      salario,
      enderecos: enderecosCriados,
    });

    await this.clienteRepository.save(cliente);

    const telefonesCriados = telefones.map((telefone) =>
      this.telefoneRepository.create({ ...telefone, cliente }),
    );
    await this.telefoneRepository.save(telefonesCriados);

    cliente.telefones = telefonesCriados;

    const empresasCriadas = empresas.map((empresa) =>
      this.empresaRepository.create({ ...empresa, cliente }),
    );
    await this.empresaRepository.save(empresasCriadas);
    cliente.empresas = empresasCriadas;

    return cliente;
  }

  async findAll(): Promise<Cliente[]> {
    return this.clienteRepository.find({
      relations: ['telefones', 'enderecos', 'empresas'],
    });
  }

  async findOne(id: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({
      where: { id },
      relations: ['telefones', 'enderecos', 'empresas'],
    });

    if (!cliente) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return cliente;
  }

  async findMultipleByIds(ids: number[]): Promise<Cliente[]> {
    return this.clienteRepository.find({
      where: { id: In(ids) },
      relations: ['telefones', 'enderecos', 'empresas'],
    });
  }

  async update(
    id: number,
    updateClienteDto: UpdateClienteDto,
  ): Promise<Cliente> {
    const cliente = await this.findOne(id);

    if (updateClienteDto.email && updateClienteDto.email !== cliente.email) {
      const emailExistente = await this.clienteRepository.findOne({
        where: { email: updateClienteDto.email },
      });
      if (emailExistente) {
        throw new ConflictException('Email já está em uso por outro cliente.');
      }
    }

    if (updateClienteDto.cpf && updateClienteDto.cpf !== cliente.cpf) {
      const cpfExistente = await this.clienteRepository.findOne({
        where: { cpf: updateClienteDto.cpf },
      });
      if (cpfExistente) {
        throw new ConflictException('CPF já está em uso por outro cliente.');
      }
    }

    Object.assign(cliente, updateClienteDto);
    await this.clienteRepository.save(cliente);

    return cliente;
  }

  async remove(id: number): Promise<{ message: string }> {
    const cliente = await this.findOne(id);
    await this.clienteRepository.remove(cliente);
    return { message: 'Cliente removido com sucesso!' };
  }

  async removeMultiple(ids: number[]): Promise<{ message: string }> {
    const deleteResult = await this.clienteRepository.delete({ id: In(ids) });

    if (deleteResult.affected === 0) {
      throw new NotFoundException(
        `Nenhum cliente foi encontrado para remoção.`,
      );
    }

    return { message: `Clientes removidos com sucesso!` };
  }
}
