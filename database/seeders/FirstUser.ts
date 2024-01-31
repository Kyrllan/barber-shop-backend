import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import User from "App/Models/User";

export default class FirstUserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: "John Doe (Admin)",
        email: "admin@gmail.com",
        password: "doe",
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
        name: "Barbeiro 2",
        email: "barber2@gmail.com",
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
      {
        name: "Cliente 2",
        email: "cliente2@gmail.com",
        password: "123456",
        cpf: "123.456.789-10",
        phone: "(11) 12345-6789",
        role: "user",
      },
      {
        name: "Cliente 3",
        email: "cliente3@gmail.com",
        password: "123456",
        cpf: "123.456.789-10",
        phone: "(11) 12345-6789",
        role: "user",
      },
    ]);
  }
}
