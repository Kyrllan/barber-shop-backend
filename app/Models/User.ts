/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *           description: ID do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: Email do usuário
 *         password:
 *           type: string
 *           format: password
 *           description: Senha do usuário
 *         name:
 *           type: string
 *           description: Nome do usuário
 *         cpf:
 *           type: string
 *           description: CPF do usuário
 *         phone:
 *           type: string
 *           description: Número de telefone do usuário
 *         active:
 *           type: boolean
 *           description: Indica se o usuário está ativo
 *         role:
 *           type: string
 *           enum: [admin, user, barber]
 *           description: Função do usuário
 *       required:
 *         - email
 *         - password
 *         - name
 *         - cpf
 *         - phone
 *         - active
 *         - role
 *       example:
 *         id: 1
 *         email: "user@example.com"
 *         password: "hashed_password"
 *         name: "John Doe"
 *         cpf: "123.456.789-00"
 *         phone: "(12) 3456-7890"
 *         active: true
 *         role: "user"
 */

import { DateTime } from "luxon";
import Hash from "@ioc:Adonis/Core/Hash";
import { column, beforeSave, BaseModel } from "@ioc:Adonis/Lucid/Orm";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

  @column()
  public name: string;

  @column()
  public cpf: string;

  @column()
  public phone: string;

  @column({ serialize: Boolean })
  public active: boolean;

  @column()
  public role: "admin" | "user" | "barber";

  @column({ serializeAs: null })
  public rememberMeToken?: string;

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime;

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password);
    }
  }
}
