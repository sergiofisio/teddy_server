import {
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateEnderecoDto } from '../create-endereco.dto/create-endereco.dto';
import { CreateTelefoneDto } from '../create-telefone.dto/create-telefone.dto';
import { CreateEmpresaDto } from '../create-empresa.dto/create-empresa.dto';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsNumber()
  salario: number;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateEnderecoDto)
  enderecos: CreateEnderecoDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTelefoneDto)
  telefones: CreateTelefoneDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateEmpresaDto)
  empresas?: CreateEmpresaDto[];
}
