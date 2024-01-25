import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Times extends BaseSchema {
  protected tableName = "times";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.string("time", 5).notNullable().unique();
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
