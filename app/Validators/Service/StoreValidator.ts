import { schema, CustomMessages, rules } from "@ioc:Adonis/Core/Validator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class ServiceStoreValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    name: schema.string({ trim: true }, [
      rules.unique({ table: "services", column: "name" }),
    ]),
    description: schema.string({ trim: true }),
    price: schema.number(),
  });

  public messages: CustomMessages = {
    "name.unique": "O campo '{{field}}' deve ser unico",
  };
}
