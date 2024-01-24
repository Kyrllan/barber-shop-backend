import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class FirstUserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: "John Doe",
        email: "johndoe@gmail.com",
        password: "123456",
        cpf: "123.456.789-10",
        phone: "(11) 12345-6789",
        role: "admin",
      },
      {
        name: "Barbeiro 1",
        email: "barber@gmail.com",
        password: "123456",
        cpf: "123.456.789-10",
        phone: "(11) 12345-6789",
        role: "employee",
      },
      {
        name: "Cliente 1",
        email: "cliente1@gmail.com",
        password: "123456",
        cpf: "123.456.789-10",
        phone: "(11) 12345-6789",
        role: "user",
      },
    ]);
    // Write your database queries inside the run method
  }
}
