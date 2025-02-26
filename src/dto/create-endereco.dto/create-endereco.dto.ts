import { IsString, IsNotEmpty, MaxLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEnderecoDto {
  @ApiProperty({ example: 'Rua das Flores', description: 'Nome da rua' })
  @IsString()
  @IsNotEmpty()
  logradouro: string;

  @ApiProperty({ example: '123', description: 'Número da casa' })
  @IsString()
  @IsNotEmpty()
  numero: string;

  @ApiProperty({ example: 'Apto 201', description: 'Complemento (opcional)' })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  complemento?: string;

  @ApiProperty({ example: 'Centro', description: 'Bairro' })
  @IsString()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty({ example: '12345-678', description: 'CEP' })
  @IsString()
  @IsNotEmpty()
  cep: string;

  @ApiProperty({ example: 'São Paulo', description: 'Cidade' })
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty({ example: 'SP', description: 'Estado' })
  @IsString()
  @IsNotEmpty()
  estado: string;
}
