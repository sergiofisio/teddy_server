import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsOptional, IsString, IsNumber } from 'class-validator';
import { CreateClienteDto } from '../create-cliente.dto.ts/create-cliente.dto';

export class UpdateClienteDto extends PartialType(CreateClienteDto) {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Email inválido' })
  email?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsNumber()
  salario?: number;
}
