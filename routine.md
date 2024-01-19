# Rotina Projeto Backend

## Criar o sistema backend em node com AdonisJS

```
npm init adonis-ts-app@latest barber-shop-backend
```

## Criar e configurar o docker-compose.yaml contendo a imagem do mysql:

```
version: "3.9"

services:
  database:
    image: mysql:latest
    container_name: barber-shop
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: secret
      MYSQL_DATABASE: barber_shop
    ports:
      - "3306:3306"
```

## Instalar lucid ORM no projeto:

```
npm install @adonisjs/lucid@alpha
```

## Configurar o lucid no adonis

```
node ace invoke @adonisjs/lucid
```

## Declarar os tipos das variaveis de ambiente do banco de dados no arquivo env.ts

```
MYSQL_HOST: Env.schema.string({ format: 'host' }),
MYSQL_PORT: Env.schema.number(),
MYSQL_USER: Env.schema.string(),
MYSQL_PASSWORD: Env.schema.string.optional(),
MYSQL_DB_NAME: Env.schema.string(),
```

Verificar se no arquivo .env foram criadas as variaveis automaticamente.
No arquivo env.ts criar a variavel DB_CONNECTION caso não tenha sido criada

```
DB_CONNECTION: Env.schema.string(),
```

## Instalar pacote de autenticacao (auth)

```
npm i @adonisjs/auth@alpha
```

## Configurar o auth no adonis

```
node ace invoke @adonisjs/auth
```

Deverão serem criadas as migrations e o model de User de acordo com as configuracões.
Após configurado as migration e o model de User, rodar a migration com o commando:

```
node ace migration:run
```

Se tudo ocorrer corretamente, será criado as tabelas no banco de dados.

## Criar o primeiro usuario utilizando seeders

```
node ace make:seeder FirstUser
```

Criará uma seeder de Primeiro Usuário, Configurar essa seeder de com os dados do usuário

```
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class FirstUserSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      cpf: '123.456.789-10',
      phone: '(11) 12345-6789',
      role: 'admin'
    })
    // Write your database queries inside the run method
  }
}
```

Rodar o comando abaixo para aplicar as alteracoes no banco de dados

```
node ace db:seed
```

## Criando migration e model de service

```
node ace make:migration service
```

definir as colunas da tabela services

```
import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Services extends BaseSchema {
  protected tableName = 'services'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name')
      table.string('description')
      table.double('price')
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
```

criar o model de service

```
node ace make:model Service
```
