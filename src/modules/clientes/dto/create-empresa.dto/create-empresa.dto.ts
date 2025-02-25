import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Matches, IsNumber } from 'class-validator';

export class CreateEmpresaDto {
  @ApiProperty({ example: '12345678000195', description: 'CNPJ da empresa' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{14}$/, { message: 'CNPJ deve conter exatamente 14 dígitos' })
  cnpj: string;

  @ApiProperty({ example: 50000.0, description: 'Valor associado à empresa' })
  @IsNumber()
  @IsNotEmpty()
  valor: number;
}
