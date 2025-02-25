import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto/create-cliente.dto';
import { Telefone } from './entities/telefone.entity/telefone.entity';
import { Endereco } from './entities/endereco.entity/endereco.entity';
import { Empresa } from './entities/empresa.entity/empresa.entity';
import { AddEmpresaDto } from './dto/add-empresa.dto/add-empresa.dto';

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

  private async validarClienteExiste(email: string, cpf: string, id?: number) {
    const clienteExistente = await this.clienteRepository.findOne({
      where: [
        { email, id: id ? Not(id) : undefined },
        { cpf, id: id ? Not(id) : undefined },
      ],
    });

    if (clienteExistente) {
      throw new ConflictException('Cliente com esse CPF ou Email já existe.');
    }
  }

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const { nome, email, cpf, salario, telefones, endereco, empresas } =
      createClienteDto;

    await this.validarClienteExiste(email, cpf);

    let enderecoExistente = await this.enderecoRepository.findOne({
      where: {
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        numero: endereco.numero,
      },
    });

    if (!enderecoExistente) {
      enderecoExistente = this.enderecoRepository.create(endereco);
      await this.enderecoRepository.save(enderecoExistente);
    }

    const cliente = this.clienteRepository.create({
      nome,
      email,
      cpf,
      salario,
      enderecos: [enderecoExistente],
    });

    await this.clienteRepository.save(cliente);

    if (telefones?.length) {
      const telefonesCriados = telefones.map((telefone) =>
        this.telefoneRepository.create({ ...telefone, cliente }),
      );
      await this.telefoneRepository.save(telefonesCriados);
      cliente.telefones = telefonesCriados;
    }

    if (empresas?.length) {
      const empresasCriadas = empresas.map((empresa) =>
        this.empresaRepository.create({ ...empresa, cliente }),
      );
      await this.empresaRepository.save(empresasCriadas);
      cliente.empresas = empresasCriadas;
    }

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
      throw new NotFoundException(`Cliente com ID ${id} não encontrado`);
    }

    return cliente;
  }

  async update(
    id: number,
    updateClienteDto: Partial<CreateClienteDto>,
  ): Promise<{ message: string }> {
    const cliente = await this.findOne(id);

    if (updateClienteDto.email || updateClienteDto.cpf) {
      await this.validarClienteExiste(
        updateClienteDto.email || cliente.email,
        updateClienteDto.cpf || cliente.cpf,
        id,
      );
    }

    Object.assign(cliente, updateClienteDto);
    await this.clienteRepository.save(cliente);

    return { message: 'Dados do cliente atualizados com sucesso!' };
  }

  async remove(id: number): Promise<{ message: string }> {
    const cliente = await this.findOne(id);

    await this.telefoneRepository.delete({ cliente: { id } });

    await this.empresaRepository.delete({ cliente: { id } });

    await this.enderecoRepository.delete({ cliente: { id } });

    await this.clienteRepository.remove(cliente);

    return {
      message:
        'Cliente e todos os dados associados foram removidos com sucesso!',
    };
  }

  async addEmpresa(
    clienteId: number,
    addEmpresaDto: AddEmpresaDto,
  ): Promise<{ message: string }> {
    const cliente = await this.clienteRepository.findOne({
      where: { id: clienteId },
      relations: ['empresas'],
    });

    if (!cliente) {
      throw new NotFoundException(
        `Cliente com ID ${clienteId} não encontrado.`,
      );
    }

    const empresaExistente = cliente.empresas.find(
      (empresa) => empresa.cnpj === addEmpresaDto.cnpj,
    );

   if (empresaExistente) {
     throw new ConflictException(
       `O cliente já possui uma empresa cadastrada com o CNPJ ${addEmpresaDto.cnpj}.`,
     );
   }

    const novaEmpresa = this.empresaRepository.create({
      ...addEmpresaDto,
      cliente,
    });

    await this.empresaRepository.save(novaEmpresa);

    return { message: 'Empresa adicionada com sucesso!' };
  }

  async updateEmpresa(
    empresaId: number,
    updateEmpresaDto: AddEmpresaDto,
  ): Promise<{ message: string }> {
    const empresa = await this.empresaRepository.findOne({
      where: { id: empresaId },
    });

    if (!empresa) {
      throw new NotFoundException(
        `Empresa com ID ${empresaId} não encontrada.`,
      );
    }

    const empresaExistente = await this.empresaRepository.findOne({
      where: { cnpj: updateEmpresaDto.cnpj },
    });

    if (empresaExistente && empresaExistente.id !== empresaId) {
      throw new ConflictException(
        `CNPJ ${updateEmpresaDto.cnpj} já está cadastrado.`,
      );
    }

    await this.empresaRepository.update(empresaId, updateEmpresaDto);
    return { message: 'Dados da empresa atualizados com sucesso!' };
  }
}
