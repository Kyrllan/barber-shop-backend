import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'

export default class ServicesController {
  public async index({}: HttpContextContract) {
    const services = await Service.all()

    return services
  }

  public async store({request}: HttpContextContract) {
    const data = request.only(['name', 'description', 'price'])
    const services = await Service.create(data)

    return services
  }

  public async show({params}: HttpContextContract) {
    const services = await Service.findOrFail(params.id)
    return services
  }

  public async update({request, params}: HttpContextContract) {
    const data = request.only(['name', 'description', 'price'])
    const services = await Service.findOrFail(params.id)
    services.merge(data)
    await services.save()
    return services
  }

  public async destroy({params}: HttpContextContract) {
    const services = await Service.findOrFail(params.id)

    await services.delete()
  }
}
