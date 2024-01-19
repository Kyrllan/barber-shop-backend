## Rotina Projeto Backend

# Criar o sistema backend em node com AdonisJS

```
npm init adonis-ts-app@latest meu-projeto
```

# Criar e configurar o docker-compose.yaml contendo a imagem do mysql:

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

# Instalar lucid ORM no projeto:
