import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ClienteService } from './clientes.service';
import { CreateClienteDto } from './dto/create-cliente.dto/create-cliente.dto';
import { ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { AddEmpresaDto } from './dto/add-empresa.dto/add-empresa.dto';

@ApiTags('clientes')
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiOperation({ summary: 'Cria um novo cliente' })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Post(':id/empresas')
  @ApiOperation({ summary: 'Adiciona uma nova empresa ao cliente' })
  addEmpresa(@Param('id') id: number, @Body() addEmpresaDto: AddEmpresaDto) {
    return this.clienteService.addEmpresa(id, addEmpresaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Adquirir todos clientes' })
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Adquirir um cliente pelo ID' })
  findOne(@Param('id') id: number) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualiza um cliente pelo ID' })
  update(@Param('id') id: number, @Body() updateClienteDto: CreateClienteDto) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Patch('empresas/:id')
  @ApiOperation({
    summary: 'Atualizar os dados de uma empresa associada a um cliente',
  })
  updateEmpresa(
    @Param('id') empresaId: number,
    @Body() updateEmpresaDto: AddEmpresaDto,
  ) {
    return this.clienteService.updateEmpresa(empresaId, updateEmpresaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove um cliente pelo ID' })
  remove(@Param('id') id: number) {
    return this.clienteService.remove(id);
  }
}
