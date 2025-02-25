import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateTelefoneDto {
  @ApiProperty({
    example: '55',
    description: 'Código do país (Padrão: Brasil - 55)',
  })
  @IsString()
  @IsNotEmpty()
  codigoPais: string = '55';

  @ApiProperty({ example: '11', description: 'Código de área (DDD)' })
  @IsString()
  @IsNotEmpty()
  @Length(2, 2, { message: 'Código de área deve ter exatamente 2 dígitos' })
  codigoArea: string;

  @ApiProperty({ example: '987654321', description: 'Número de telefone' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{8,9}$/, {
    message: 'Número de telefone deve ter 8 ou 9 dígitos',
  })
  numero: string;
}
