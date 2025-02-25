import { ConflictException, NotFoundException } from '@nestjs/common';
import { Cliente } from '../modules/clientes/entities/cliente.entity/cliente.entity';
import { Repository } from 'typeorm';
import { CreateClienteDto } from '../modules/clientes/dto/create-cliente.dto/create-cliente.dto';

export async function validateAndUpdateCliente(
  id: number,
  updateClienteDto: Partial<CreateClienteDto>,
  clienteRepository: Repository<Cliente>,
): Promise<Cliente> {
  const cliente = await clienteRepository.findOne({
    where: { id },
    relations: ['telefones', 'empresas', 'endereco'],
  });

  if (!cliente) {
    throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
  }

  if (updateClienteDto.email) {
    const emailExists = await clienteRepository.findOne({
      where: { email: updateClienteDto.email },
    });
    if (emailExists && emailExists.id !== id) {
      throw new ConflictException('Email já cadastrado para outro cliente.');
    }
    cliente.email = updateClienteDto.email;
  }

  if (updateClienteDto.cpf) {
    const cpfExists = await clienteRepository.findOne({
      where: { cpf: updateClienteDto.cpf },
    });
    if (cpfExists && cpfExists.id !== id) {
      throw new ConflictException('CPF já cadastrado para outro cliente.');
    }
    cliente.cpf = updateClienteDto.cpf;
  }

  if (updateClienteDto.nome) cliente.nome = updateClienteDto.nome;
  if (updateClienteDto.salario !== undefined)
    cliente.salario = updateClienteDto.salario;

  if (updateClienteDto.endereco) {
    cliente.enderecos = Object.assign(
      cliente.enderecos || {},
      updateClienteDto.endereco,
    );
  }

  return cliente;
}
