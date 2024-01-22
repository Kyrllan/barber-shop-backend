import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class FirstUserSeeder extends BaseSeeder {
  public async run () {
    await User.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
      cpf: '123.456.789-10',
      phone: '(11) 12345-6789',
      role: 'admin'
    })
    // Write your database queries inside the run method
  }
}
