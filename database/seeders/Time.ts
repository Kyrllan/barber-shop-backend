import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Time from "App/Models/Time";

export default class TimeSeeder extends BaseSeeder {
  public async run() {
    await Time.createMany([
      { time: "08:00" },
      { time: "08:30" },
      { time: "09:00" },
      { time: "09:30" },
      { time: "10:00" },
      { time: "10:30" },
      { time: "11:00" },
      { time: "11:30" },
      { time: "13:00" },
      { time: "13:30" },
      { time: "14:00" },
      { time: "14:30" },
      { time: "15:00" },
      { time: "15:30" },
      { time: "16:00" },
      { time: "16:30" },
      { time: "17:00" },
      { time: "17:30" },
      { time: "18:00" },
      { time: "18:30" },
    ]);
    // Write your database queries inside the run method
  }
}
