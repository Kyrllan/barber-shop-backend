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
  public schedule_time: string;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
