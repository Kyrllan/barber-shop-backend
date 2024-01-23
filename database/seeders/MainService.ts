import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Service from "App/Models/Service";

export default class MainServiceSeeder extends BaseSeeder {
  public async run() {
    await Service.createMany([
      { name: "Corte de Cabelo", description: "Corte de Cabelo", price: 30 },
      { name: "Corte de Barba", description: "Corte de Barba", price: 20 },
    ]);
    // Write your database queries inside the run method
  }
}
