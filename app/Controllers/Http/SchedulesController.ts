import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Schedule from "App/Models/Schedule";

export default class SchedulesController {
  public async index({}: HttpContextContract) {
    const schedules = await Schedule.all();

    return schedules;
  }

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

      //await schedule.preload("client");

      return schedule;
    } catch (error) {
      return response.badRequest({
        error: error.message,
      });
    }
  }

  public async show({ params, response }: HttpContextContract) {
    const schedule = await Schedule.findOrFail(params.id);
    if (!schedule) {
      return response.notFound();
    }
    return schedule;
  }

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

  public async destroy({ params, response }: HttpContextContract) {
    const schedule = await Schedule.findOrFail(params.id);
    if (!schedule) {
      return response.notFound();
    }
    await schedule.delete();
  }
}
