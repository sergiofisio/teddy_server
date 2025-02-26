import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmpresaDto {
  @ApiProperty({ example: 'Tech Solutions', description: 'Nome da empresa' })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    example: '12.345.678/0001-90',
    description: 'CNPJ da empresa',
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(18)
  cnpj: string;

  @ApiProperty({ example: 50000.0, description: 'Valor associado à empresa' })
  @IsNumber()
  @Min(0)
  valor: number;
}
