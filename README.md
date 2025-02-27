# Teddy Server 🚀

Este repositório contém o backend da aplicação Teddy, desenvolvido com **NestJS** e **TypeORM**, utilizando **PostgreSQL** como banco de dados. A aplicação está hospedada na Render.

## 📌 Tecnologias Utilizadas

- **NestJS** - Framework para Node.js
- **TypeORM** - ORM para TypeScript/JavaScript
- **PostgreSQL** - Banco de dados relacional
- **Docker** - Containerização da aplicação
- **Jest** - Testes automatizados
- **Swagger** - Documentação da API
- **Render** - Hospedagem da aplicação

## 🔥 Funcionalidades

- **Gerenciamento de Clientes** (CRUD)
- **Gerenciamento de Empresas** (CRUD)
- **Gerenciamento de Endereços** (CRUD)
- **Gerenciamento de Telefones** (CRUD)
- **Documentação da API com Swagger**

## 🚀 Como Rodar a Aplicação

### 🔹 Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- **Node.js** (versão recomendada: 16+)
- **Yarn** ou **NPM**
- **Docker** (para ambiente de desenvolvimento)

### 🔹 Configuração do Ambiente

1. Clone este repositório:

   ```sh
   git clone https://github.com/sergiofisio/teddy_server.git
   cd teddy-server
   ```

2. Instale as dependências:

   ```sh
   yarn install
   ```

3. Configure as variáveis de ambiente:

   - Crie um arquivo `.env` na raiz do projeto e adicione as seguintes configurações:
     ```env
     DATABASE_URL=postgresql://usuario:senha@localhost:5432/teddy_db
     PORT=3000
     ```

4. Execute a aplicação em **modo desenvolvimento**:

   ```sh
   yarn start:dev
   ```

5. Acesse a API no navegador:
   ```sh
   http://localhost:3000
   ```

### 🔹 Rodando com Docker

Caso prefira rodar a aplicação via Docker:

1. Construa e suba os containers:

   ```sh
   docker-compose up --build -d
   ```

2. Acesse a API:
   ```sh
   http://localhost:3000
   ```

## ✅ Testes

Para rodar os testes automatizados, utilize o comando:

```sh
yarn test
```

## 🌍 Deploy na Render

A API está disponível no seguinte endereço:
🔗 [https://server-teddy-docker.onrender.com](https://server-teddy-docker.onrender.com)

## 📖 Documentação da API

A documentação da API está disponível via **Swagger**:

```sh
http://localhost:3000/api
```

## 🛠 Contribuição

1. Faça um **fork** do projeto
2. Crie uma **branch** (`git checkout -b feature-nova-funcionalidade`)
3. Commit suas alterações (`git commit -m 'Adicionando nova funcionalidade'`)
4. Envie para o repositório (`git push origin feature-nova-funcionalidade`)
5. Abra um **Pull Request**

---

💡 **Dúvidas ou sugestões?** Fique à vontade para abrir uma issue ou entrar em contato!

Made with ❤️ by **Sérgio** 🚀
