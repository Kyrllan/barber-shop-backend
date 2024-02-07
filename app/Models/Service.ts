/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: ID do serviço
 *         name:
 *           type: string
 *           description: Nome do serviço
 *         description:
 *           type: string
 *           description: Descrição do serviço
 *         price:
 *           type: number
 *           format: double
 *           description: Preço do serviço
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Data de criação do registro
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Data de atualização do registro
 *       required:
 *         - name
 *         - description
 *         - price
 *       example:
 *         id: 1
 *         name: "Corte de cabelo"
 *         description: "Corte de cabelo masculino"
 *         price: 50.00
 *         createdAt: "2024-02-07T12:34:56Z"
 *         updatedAt: "2024-02-07T12:34:56Z"
 */

import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";

export default class Service extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column()
  public price: number;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;
}
