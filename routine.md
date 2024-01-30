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

## Criando migration e model e controller de service

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

configurar o modelo de service

```
import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
```

criar o controller de service (CRUD)

```
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'

export default class ServicesController {
  public async index({}: HttpContextContract) {
    const services = await Service.all()

    return services
  }

  public async store({request}: HttpContextContract) {
    const data = request.only(['name', 'description', 'price'])
    const services = await Service.create(data)

    return services
  }

  public async show({params}: HttpContextContract) {
    const services = await Service.findOrFail(params.id)
    return services
  }

  public async update({request, params}: HttpContextContract) {
    const data = request.only(['name', 'description', 'price'])
    const services = await Service.findOrFail(params.id)
    services.merge(data)
    await services.save()
    return services
  }

  public async destroy({params}: HttpContextContract) {
    const services = await Service.findOrFail(params.id)

    await services.delete()
  }
}
```

Aplicar os metodos do controller em uma rota

na pasta start arquivo routes.ts, codigo abaixo aplica todos os metodos do controller nessa rota

```
Route.resource('services', 'ServicesController').apiOnly()
```

Aplicar a migration pra criacao da tabela no banco

```
node ace migration::run
```

## Validando Dados

Criar um validator pra validar e retornar melhores mensagens para o frontend

```
node ace make:validator Service
```

```
import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.unique({ table: "services", column: "name" }),
    ]),
    description: schema.string({ trim: true }),
    price: schema.number(),
  });

  public messages: CustomMessages = {};
}

```

caso queira enviar mensagens personalizadas ao frontend:

```
  public messages: CustomMessages = {
    "name.unique": "O campo '{{field}}' deve ser unico",
  };
```

## Criando middleware para proteger as rotas

```
node ace make:middleware Acl
```

exemplo do middleware criado

```
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class Acl {
  public async handle(
    { auth, response }: HttpContextContract,
    next: () => Promise<void>,
    allowedRoles: string[]
  ) {
    const user = await auth.authenticate();

    if (!allowedRoles.includes(user.role)) {
      return response.unauthorized({ error: { message: "Não Autorizado" } });
    }
    return next();
  }
}
```

Registrar o middleware no kernel (start/kernel)

```
Server.middleware.registerNamed({
  auth: () => import("App/Middleware/Auth"),
  acl: () => import("App/Middleware/Acl"),
});
```

aplicar o middleware nas rotas

```
Route.resource("service", "ServicesController")
  .apiOnly()
  .middleware({
    store: ["acl:admin"],
    update: ["acl:admin"],
    destroy: ["acl:admin"],
  });
Route.resource("user", "UsersController").apiOnly();
Route.resource("schedule", "SchedulesController")
  .apiOnly()
  .middleware({
    store: ["auth"],
    update: ["auth"],
    destroy: ["auth"],
  });
Route.resource("time", "TimesController")
  .apiOnly()
  .middleware({
    store: ["acl:admin"],
    update: ["acl:admin"],
    destroy: ["acl:admin"],
  });
Route.group(() => {
  Route.post("/login", "AuthController.store");
  Route.delete("/logout", "AuthController.destroy").middleware("auth");
}).prefix("auth");
```
