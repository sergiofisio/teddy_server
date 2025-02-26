import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ClienteService } from './clientes.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateClienteDto } from './../dto/create-cliente.dto.ts/create-cliente.dto';
import { UpdateClienteDto } from './../dto/update-cliente.dto/update-cliente.dto';

@ApiTags('clientes')
@Controller('clientes')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  @ApiBody({
    type: CreateClienteDto,
    examples: {
      exemploCriacao: {
        summary: 'Exemplo de criação de Cliente',
        value: {
          nome: 'João Silva',
          email: 'joao@email.com',
          cpf: '12345678900',
          salario: 5000.0,
          telefones: [
            { codigo_pais: '55', codigo_area: '11', numero: '987654321' },
          ],
          enderecos: [
            {
              logradouro: 'Avenida Paulista',
              numero: '1000',
              complemento: 'Apto 42',
              bairro: 'Centro',
              cep: '01311000',
              cidade: 'São Paulo',
              estado: 'SP',
            },
          ],
          empresas: [
            { nome: 'Empresa X', cnpj: '11222333000199', valor: 15000.0 },
          ],
        },
      },
    },
  })
  create(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Get()
  findAll() {
    return this.clienteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.clienteService.findOne(id);
  }

  @Patch(':id')
  @ApiBody({
    type: UpdateClienteDto,
    examples: {
      exemploAtualizacao: {
        summary: 'Exemplo de atualização de Cliente',
        value: {
          nome: 'João Carlos',
          email: 'joaocarlos@email.com',
          salario: 6000.0,
          telefones: [
            { codigoPais: '55', codigoArea: '21', numero: '999888777' },
          ],
          enderecos: [
            {
              rua: 'Rua das Flores',
              numero: '500',
              complemento: '',
              bairro: 'Jardins',
              cep: '04567900',
              cidade: 'Rio de Janeiro',
              estado: 'RJ',
            },
          ],
        },
      },
    },
  })
  update(
    @Param('id') id: number,
    @Body() updateClienteDto: Partial<UpdateClienteDto>,
  ) {
    return this.clienteService.update(id, updateClienteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.clienteService.remove(id);
  }
}
