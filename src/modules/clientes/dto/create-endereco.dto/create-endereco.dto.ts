import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length } from 'class-validator';

export class CreateEnderecoDto {
  @ApiProperty({ example: '01001-000' })
  @IsString()
  @IsNotEmpty()
  @Length(8, 9)
  cep: string;

  @ApiProperty({ example: 'Praça da Sé' })
  @IsString()
  @IsNotEmpty()
  logradouro: string;

  @ApiProperty({ example: '100' })
  @IsString()
  @IsNotEmpty()
  numero: string;

  @ApiProperty({ example: 'Apto 10', required: false })
  @IsString()
  complemento?: string;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @IsNotEmpty()
  bairro: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  @IsNotEmpty()
  cidade: string;

  @ApiProperty({ example: 'SP' })
  @IsString()
  @IsNotEmpty()
  estado: string;
}
