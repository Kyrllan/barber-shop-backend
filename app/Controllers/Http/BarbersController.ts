/**
 * @swagger
 * tags:
 *   name: Barbers
 *   description: Endpoints para manipulação de Barbers
 */
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Schedule from "App/Models/Schedule";
import Time from "App/Models/Time";
import User from "App/Models/User";

export default class BarbersController {
  /**
   * @swagger
   * /barbers/availability:
   *   get:
   *     summary: Retorna os horários disponíveis para um barbeiro em uma determinada data
   *     tags: [Barbers]
   *     parameters:
   *       - in: query
   *         name: barberId
   *         required: true
   *         schema:
   *           type: integer
   *         description: ID do barbeiro
   *       - in: query
   *         name: date
   *         required: true
   *         schema:
   *           type: string
   *           format: date
   *         description: Data no formato YYYY-MM-DD
   *     responses:
   *       200:
   *         description: Lista de horários disponíveis
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Time'
   */
  public async availability({ request }: HttpContextContract) {
    const { barberId, date } = request.qs();

    const scheduleTime = await Schedule.query()
      .where("barber_id", barberId)
      .where("schedule_date", date)
      .preload("time");

    const scheduledTimeIds = scheduleTime.map((item) => item.time.id);

    const allTimes = await Time.query();

    const availableTimes = allTimes.filter(
      (item) => !scheduledTimeIds.includes(item.id)
    );

    return availableTimes;
  }

  /**
   * @swagger
   * /barbers/allBarbers:
   *   get:
   *     summary: Retorna todos os barbeiros
   *     tags: [Barbers]
   *     responses:
   *       200:
   *         description: Lista de barbeiros
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  public async allBarbers({}: HttpContextContract) {
    const barbers = await User.query().where("role", "barber");
    return barbers;
  }
}
