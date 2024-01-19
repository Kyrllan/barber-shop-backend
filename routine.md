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

## Configurar o lucid no adonis (ou qualquer outro pacote que tenha sido instalado):

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

verificar se no arquivo .env foram criadas as variaveis automaticamente.
no arquivo env.ts criar a variavel DB_CONNECTION caso não tenha sido criada

```
DB_CONNECTION: Env.schema.string(),
```
