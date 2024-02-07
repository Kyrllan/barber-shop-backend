/**
 * @swagger
 * components:
 *   schemas:
 *     Time:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: ID do time
 *         time:
 *           type: string
 *           description: Nome do time
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualização do registro
 *       example:
 *         id: 1
 *         time: "Time A"
 *         createdAt: "2024-02-07T12:34:56Z"
 *         updatedAt: "2024-02-07T12:34:56Z"
 */

import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Time extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public time: string;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
