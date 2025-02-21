import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class Schedules extends BaseSchema {
  protected tableName = "schedules";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table
        .integer("client_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("barber_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("service_id")
        .unsigned()
        .references("id")
        .inTable("services")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .onDelete("CASCADE");
      table.date("schedule_date").notNullable();
      table
        .integer("schedule_time")
        .unsigned()
        .references("id")
        .inTable("times")
        .onUpdate("CASCADE")
        .onDelete("CASCADE")
        .onDelete("CASCADE");
      table.timestamps(true);
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
