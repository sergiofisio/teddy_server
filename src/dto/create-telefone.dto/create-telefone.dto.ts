import { IsString, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTelefoneDto {
  @ApiProperty({ example: '55', description: 'Código do país' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  codigo_pais: string;

  @ApiProperty({ example: '11', description: 'Código de área' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2)
  codigo_area: string;

  @ApiProperty({ example: '987654321', description: 'Número do telefone' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  numero: string;
}
