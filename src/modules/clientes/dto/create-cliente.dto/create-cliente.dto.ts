import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsArray,
  ValidateNested,
  IsObject,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTelefoneDto } from '../create-telefone.dto/create-telefone.dto';
import { CreateEnderecoDto } from '../create-endereco.dto/create-endereco.dto';
import { CreateEmpresaDto } from '../create-empresa.dto/create-empresa.dto';

export class CreateClienteDto {
  @ApiProperty({ example: 'João Silva' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({ example: 'joao@email.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '12345678901' })
  @IsString()
  @Length(11, 11, { message: 'CPF deve ter exatamente 11 dígitos' })
  @IsNotEmpty()
  cpf: string;

  @ApiProperty({ example: 5000.0, description: 'Salário do cliente' })
  @IsNumber()
  @IsNotEmpty()
  salario: number;

  @ApiProperty({ type: [CreateTelefoneDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTelefoneDto)
  telefones: CreateTelefoneDto[];

  @ApiProperty({ type: CreateEnderecoDto })
  @IsObject()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  endereco: CreateEnderecoDto;

  @ApiProperty({ type: [CreateEmpresaDto], required: false })
  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreateEmpresaDto)
  empresas?: CreateEmpresaDto[];
}
