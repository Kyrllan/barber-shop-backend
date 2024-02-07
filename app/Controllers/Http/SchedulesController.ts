/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: Endpoints para manipulação de agendamentos
 */

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Schedule from "App/Models/Schedule";

export default class SchedulesController {
  /**
   * @swagger
   * /schedule:
   *   get:
   *     summary: Retorna todos os agendamentos
   *     tags: [Schedules]
   *     responses:
   *       200:
   *         description: Uma lista de agendamentos
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Schedule'
   */
  public async index({}: HttpContextContract) {
    const schedules = await Schedule.query()
      .preload("client")
      .preload("barber")
      .preload("service")
      .preload("time");

    return schedules;
  }

  /**
   * @swagger
   * /schedule:
   *   post:
   *     summary: Cria um novo agendamento
   *     tags: [Schedules]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Schedule'
   *     responses:
   *       200:
   *         description: Agendamento criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Schedule'
   */
  public async store({ request, response, auth }: HttpContextContract) {
    const userId = auth.user?.id;

    const data = request.only([
      "barber_id",
      "service_id",
      "schedule_date",
      "schedule_time",
    ]);

    try {
      const schedule = await Schedule.create({
        ...data,
        client_id: userId,
      });

      return schedule;
    } catch (error) {
      return response.badRequest({
        error: error.message,
      });
    }
  }

  /**
   * @swagger
   * /schedule/{id}:
   *   get:
   *     summary: Obtém um agendamento específico
   *     tags: [Schedules]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: ID do agendamento
   *     responses:
   *       200:
   *         description: Agendamento encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Schedule'
   *       404:
   *         description: Agendamento não encontrado
   */
  public async show({ params, response }: HttpContextContract) {
    const schedule = await Schedule.findOrFail(params.id);
    if (!schedule) {
      return response.notFound();
    }
    return schedule;
  }

  /**
   * @swagger
   * /schedule/{id}:
   *   put:
   *     summary: Atualiza um agendamento existente
   *     tags: [Schedules]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: ID do agendamento
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Schedule'
   *     responses:
   *       200:
   *         description: Agendamento atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Schedule'
   *       404:
   *         description: Agendamento não encontrado
   */
  public async update({
    params,
    request,
    response,
    auth,
  }: HttpContextContract) {
    const userId = auth.user?.id;

    const data = request.only([
      "barber_id",
      "service_id",
      "schedule_date",
      "schedule_time",
    ]);

    try {
      const schedule = await Schedule.findOrFail(params.id);
      if (!schedule) {
        return response.notFound();
      }
      schedule.merge({
        ...data,
        client_id: userId,
      });
      await schedule.save();
      return schedule;
    } catch (error) {
      return response.badRequest({
        error: error.message,
      });
    }
  }

  /**
   * @swagger
   * /schedule/{id}:
   *   delete:
   *     summary: Exclui um agendamento existente
   *     tags: [Schedules]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: ID do agendamento
   *     responses:
   *       204:
   *         description: Agendamento excluído com sucesso
   *       404:
   *         description: Agendamento não encontrado
   */
  public async destroy({ params, response }: HttpContextContract) {
    const schedule = await Schedule.findOrFail(params.id);
    if (!schedule) {
      return response.notFound();
    }
    await schedule.delete();
  }
}
