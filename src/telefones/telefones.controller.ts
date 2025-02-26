import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { TelefoneService } from './telefones.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateTelefoneDto } from './../dto/create-telefone.dto/create-telefone.dto';

@ApiTags('telefones')
@Controller('telefones')
export class TelefoneController {
  constructor(private readonly telefoneService: TelefoneService) {}

  @Post(':id')
  @ApiBody({
    type: CreateTelefoneDto,
    examples: {
      exemploComCliente: {
        summary: 'Exemplo de Cadastro de Telefone para um Cliente',
        value: {
          codigo_pais: '55',
          codigo_area: '11',
          numero: '999999999',
        },
      },
    },
  })
  createTelefone(
    @Param('id') clienteId: number,
    @Body() createTelefoneDto: CreateTelefoneDto,
  ) {
    return this.telefoneService.createWithCliente(clienteId, createTelefoneDto);
  }

  @Patch(':id')
  @ApiBody({
    type: CreateTelefoneDto,
    examples: {
      exemploAtualizacao: {
        summary: 'Exemplo de Atualização de Telefone',
        value: {
          codigo_pais: '55',
          codigo_area: '11',
          numero: '999999999',
        },
      },
    },
  })
  update(
    @Param('id') id: number,
    @Body() updateTelefoneDto: Partial<CreateTelefoneDto>,
  ) {
    return this.telefoneService.update(id, updateTelefoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.telefoneService.remove(id);
  }
}
