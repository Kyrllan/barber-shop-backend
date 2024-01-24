import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class UsersSchema extends BaseSchema {
  protected tableName = "users";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id").primary();
      table.string("email", 255).notNullable();
      table.string("name");
      table.string("password", 180).notNullable();
      table.string("cpf").notNullable();
      table.string("phone").notNullable();
      table.boolean("active").notNullable().defaultTo(true);
      table
        .enu("role", ["admin", "employee", "user"])
        .notNullable()
        .defaultTo("user");
      table.string("remember_me_token").nullable();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
