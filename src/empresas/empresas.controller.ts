import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { EmpresaService } from './empresas.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateEmpresaDto } from './../dto/create-empresa.dto/create-empresa.dto';

@ApiTags('empresas')
@Controller('empresas')
export class EmpresaController {
  constructor(private readonly empresaService: EmpresaService) {}

  @Post(':id')
  @ApiBody({
    type: CreateEmpresaDto,
    examples: {
      exemploComCliente: {
        summary: 'Exemplo de Cadastro de Empresa para um Cliente',
        value: {
          nome: 'Empresa Exemplo',
          valor: 100000.0,
        },
      },
    },
  })
  createEmpresa(
    @Param('id') clienteId: number,
    @Body() createEnderecoDto: CreateEmpresaDto,
  ) {
    return this.empresaService.createWithCliente(clienteId, createEnderecoDto);
  }

  @Patch(':id')
  @ApiBody({
    type: CreateEmpresaDto,
    examples: {
      exemploAtualizacao: {
        summary: 'Exemplo de Atualização de Empresa',
        value: {
          nome: 'Nova Empresa',
          valor: 100000.0,
        },
      },
    },
  })
  update(
    @Param('id') id: number,
    @Body() updateEmpresaDto: Partial<CreateEmpresaDto>,
  ) {
    return this.empresaService.update(id, updateEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.empresaService.remove(id);
  }
}
