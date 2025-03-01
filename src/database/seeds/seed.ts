import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './../../clientes/entities/cliente.entity/cliente.entity';
import { Telefone } from './../../telefones/entities/telefone.entity/telefone.entity';
import { Endereco } from './../../enderecos/entities/endereco.entity/endereco.entity';
import { Empresa } from './../../empresas/entities/empresa.entity/empresa.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Telefone)
    private telefoneRepository: Repository<Telefone>,

    @InjectRepository(Endereco)
    private enderecoRepository: Repository<Endereco>,

    @InjectRepository(Empresa)
    private empresaRepository: Repository<Empresa>,
  ) {}

  async runSeed() {
    console.log('🌱 Iniciando Seed dos Clientes...');

    for (let i = 1; i <= 40; i++) {
      const email = `cliente${i}@email.com`;
      const cpf = `000000000${i}`;

      const clienteExistente = await this.clienteRepository.findOne({
        where: [{ email }, { cpf }],
      });

      if (!clienteExistente) {
        console.log(`🔹 Criando Cliente ${i}...`);

        const cliente = this.clienteRepository.create({
          nome: `Cliente ${i}`,
          email,
          cpf,
          salario: Math.floor(Math.random() * 5000 + 2500),
        });
        await this.clienteRepository.save(cliente);

        const telefone = this.telefoneRepository.create({
          codigo_pais: '55',
          codigo_area: (10 + (i % 90)).toString(),
          numero: `90000000${i}`,
          cliente,
        });

        const endereco = this.enderecoRepository.create({
          logradouro: `Rua ${i}`,
          numero: `${10 + i}`,
          complemento: `Apto ${i % 50}`,
          bairro: `Bairro ${i % 10}`,
          cep: `1000000${i}`,
          estado: 'SP',
          cidade: `Cidade ${i % 5}`,
          cliente,
        });

        const empresa = this.empresaRepository.create({
          nome: `Empresa ${i}`,
          cnpj: `1000000000000${i}`,
          valor: Math.floor(Math.random() * 500000 + 100000),
          cliente,
        });

        await Promise.all([
          this.telefoneRepository.save(telefone),
          this.enderecoRepository.save(endereco),
          this.empresaRepository.save(empresa),
        ]);

        console.log(`✅ Cliente ${i} criado com sucesso!`);
      } else {
        console.log(`⚠️ Cliente ${i} já existe, pulando...`);
      }
    }

    console.log('🎉 Seed finalizado!');
  }
}
