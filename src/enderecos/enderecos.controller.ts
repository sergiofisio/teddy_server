import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { EnderecoService } from './enderecos.service';
import { ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateEnderecoDto } from './../dto/create-endereco.dto/create-endereco.dto';

@ApiTags('enderecos')
@Controller('enderecos')
export class EnderecoController {
  constructor(private readonly enderecoService: EnderecoService) {}

  @Post(':id')
  @ApiBody({
    type: CreateEnderecoDto,
    examples: {
      exemploComCliente: {
        summary: 'Exemplo de Cadastro de Endereço para um Cliente',
        value: {
          logradouro: 'Avenida Paulista',
          numero: '1000',
          bairro: 'Bela Vista',
          cidade: 'São Paulo',
          cep: '12345-678',
          estado: 'SP',
          complemento: 'Casa 1',
        },
      },
    },
  })
  createEndereco(
    @Param('id') clienteId: number,
    @Body() createEnderecoDto: CreateEnderecoDto,
  ) {
    return this.enderecoService.createWithCliente(clienteId, createEnderecoDto);
  }

  @Patch(':id')
  @ApiBody({
    type: CreateEnderecoDto,
    examples: {
      exemploAtualizacao: {
        summary: 'Exemplo de Atualização de Endereço',
        value: {
          logradouro: 'Avenida Paulista',
          numero: '2000',
          cidade: 'São Paulo',
          estado: 'SP',
        },
      },
    },
  })
  update(
    @Param('id') enderecoId: number,
    @Body() updateEnderecoDto: Partial<CreateEnderecoDto>,
  ) {
    return this.enderecoService.update(enderecoId, updateEnderecoDto);
  }

  @Delete(':id')
  remove(@Param('id') enderecoId: number) {
    return this.enderecoService.remove(enderecoId);
  }
}
