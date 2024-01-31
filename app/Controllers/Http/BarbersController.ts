import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Schedule from "App/Models/Schedule";
import Time from "App/Models/Time";
import User from "App/Models/User";

export default class BarbersController {
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

  public async allBarbers({}: HttpContextContract) {
    const barbers = await User.query().where("role", "barber");
    return barbers;
  }
}
