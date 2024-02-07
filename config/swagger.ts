import { SwaggerConfig } from "@ioc:Adonis/Addons/Swagger";

export default {
  uiEnabled: true, // Habilita a rota do Swagger UI
  uiUrl: "docs", // URL para acessar o Swagger UI
  specEnabled: true, // Habilita a rota do swagger.json
  specUrl: "/swagger.json",

  middleware: [], // Middleware para proteger os endpoints do Swagger

  options: {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Barbershop API",
        version: "1.0.0",
        description: "My application with Swagger docs",
      },
      security: [{ bearerAuth: [] }], // Esquema de segurança para autenticação Bearer
      components: {
        securitySchemes: {
          bearerAuth: {
            // Definição do esquema de segurança Bearer
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },

    apis: ["app/**/*.ts", "docs/swagger/**/*.yml", "start/routes.ts"],
    basePath: "/",
  },
  mode: process.env.NODE_ENV === "production" ? "PRODUCTION" : "RUNTIME",
  specFilePath: "docs/swagger.json",
} as SwaggerConfig;
