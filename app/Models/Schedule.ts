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
  public schedule_time: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  public static boot() {
    super.boot();

    this.before("save", async (scheduleInstance: Schedule) => {
      // Verifique se os minutos são múltiplos de 30
      const minutos = scheduleInstance.schedule_time.minute;
      if (minutos % 30 !== 0) {
        throw new Error("Os minutos devem ser múltiplos de 30.");
      }
    });
  }
}
