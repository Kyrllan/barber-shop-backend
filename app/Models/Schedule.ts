/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: ID do agendamento
 *         client_id:
 *           type: integer
 *           description: ID do cliente
 *         barber_id:
 *           type: integer
 *           description: ID do barbeiro
 *         service_id:
 *           type: integer
 *           description: ID do serviço
 *         schedule_date:
 *           type: string
 *           format: date-time
 *           description: Data do agendamento
 *         schedule_time:
 *           type: integer
 *           description: ID do horário do agendamento
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualização do registro
 *       required:
 *         - client_id
 *         - barber_id
 *         - service_id
 *         - schedule_date
 *         - schedule_time
 *       example:
 *         id: 1
 *         client_id: 1
 *         barber_id: 2
 *         service_id: 1
 *         schedule_date: "2024-02-07T12:00:00Z"
 *         schedule_time: 1
 *         createdAt: "2024-02-07T12:34:56Z"
 *         updatedAt: "2024-02-07T12:34:56Z"
 */
import { DateTime } from "luxon";
import { BaseModel, column, belongsTo, BelongsTo } from "@ioc:Adonis/Lucid/Orm";
import User from "./User";
import Service from "./Service";
import Time from "./Time";

export default class Schedule extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column({ serializeAs: null })
  public client_id: number;

  @belongsTo(() => User, { foreignKey: "client_id" })
  public client: BelongsTo<typeof User>;

  @column({ serializeAs: null })
  public barber_id: number;

  @belongsTo(() => User, { foreignKey: "barber_id" })
  public barber: BelongsTo<typeof User>;

  @column({ serializeAs: null })
  public service_id: number;

  @belongsTo(() => Service, { foreignKey: "service_id" })
  public service: BelongsTo<typeof Service>;

  @column()
  public schedule_date: DateTime;

  @column({ serializeAs: null })
  public schedule_time: number;

  @belongsTo(() => Time, { foreignKey: "schedule_time" })
  public time: BelongsTo<typeof Time>;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
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
