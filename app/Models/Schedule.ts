import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public client_id: number;

  @column()
  public barber_id: number;

  @column()
  public service_id: number;

  @column()
  public schedule_date: DateTime;

  @column()
  public schedule_time: number;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  public static boot() {
    super.boot();

    this.before("save", async (scheduleInstance: Schedule) => {
      const dateString = JSON.stringify(scheduleInstance.schedule_date);

      const existingSchedule = await this.query()
        .where("barber_id", scheduleInstance.barber_id)
        .where("schedule_date", dateString.replace(/"/g, ""))
        .where("schedule_time", scheduleInstance.schedule_time)
        .first();
      if (existingSchedule) {
        throw new Error(
          "Já existe um agendamento para este barbeiro nesta data e hora."
        );
      }
    });
  }
}
