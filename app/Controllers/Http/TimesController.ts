/**
 * @swagger
 * tags:
 *   name: Times
 *   description: Endpoints para manipulação de times
 */

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Time from "App/Models/Time";

export default class TimesController {
  /**
   * @swagger
   * /time:
   *   get:
   *     summary: Retorna todos os times
   *     tags: [Times]
   *     description: Recupera uma lista de todos os times.
   *     responses:
   *       200:
   *         description: Uma lista de times.
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Time'
   */
  public async index({}: HttpContextContract) {
    const times = await Time.all();

    return times;
  }

  /*   public async store({ request }: HttpContextContract) {
    const data = request.only(["time"]);
    const times = await Time.create(data);

    return times;
  }

  public async show({ params }: HttpContextContract) {
    const times = await Time.findOrFail(params.id);
    return times;
  }

  public async update({ request, params }: HttpContextContract) {
    const data = request.only(["time"]);
    const times = await Time.findOrFail(params.id);
    times.merge(data);
    await times.save();
    return times;
  }

  public async destroy({ params }: HttpContextContract) {
    const times = await Time.findOrFail(params.id);

    await times.delete();
  } */
}
