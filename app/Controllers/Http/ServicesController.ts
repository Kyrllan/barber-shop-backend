/**
 * @swagger
 * tags:
 *   name: Services
 *   description: Endpoints para manipulação de servicos
 */

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Service from "App/Models/Service";
import ServiceStoreValidator from "App/Validators/Service/StoreValidator";
import ServiceUpdateValidator from "App/Validators/Service/UpdateValidator";

export default class ServicesController {
  /**
   * @swagger
   * /service:
   *   get:
   *     summary: Retorna todos os serviços
   *     tags: [Services]
   *     responses:
   *       200:
   *         description: Uma lista de serviços
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Service'
   */
  public async index({}: HttpContextContract) {
    const services = await Service.all();
    return services;
  }

  /**
   * @swagger
   * /service:
   *   post:
   *     summary: Cria um novo serviço
   *     tags: [Services]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Service'
   *     responses:
   *       200:
   *         description: Serviço criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Service'
   */
  public async store({ request }: HttpContextContract) {
    const data = await request.validate(ServiceStoreValidator);
    const services = await Service.create(data);
    return services;
  }

  /**
   * @swagger
   * /service/{id}:
   *   get:
   *     summary: Obtém um serviço específico
   *     tags: [Services]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: ID do serviço
   *     responses:
   *       200:
   *         description: Serviço encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Service'
   *       404:
   *         description: Serviço não encontrado
   */
  public async show({ params }: HttpContextContract) {
    const services = await Service.findOrFail(params.id);
    return services;
  }

  /**
   * @swagger
   * /service/{id}:
   *   put:
   *     summary: Atualiza um serviço existente
   *     tags: [Services]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: ID do serviço
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Service'
   *     responses:
   *       200:
   *         description: Serviço atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Service'
   *       404:
   *         description: Serviço não encontrado
   */
  public async update({ request, params }: HttpContextContract) {
    const data = await request.validate(ServiceUpdateValidator);
    const services = await Service.findOrFail(params.id);
    services.merge(data);
    await services.save();
    return services;
  }

  /**
   * @swagger
   * /service/{id}:
   *   delete:
   *     summary: Exclui um serviço existente
   *     tags: [Services]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: ID do serviço
   *     responses:
   *       204:
   *         description: Serviço excluído com sucesso
   *       404:
   *         description: Serviço não encontrado
   */
  public async destroy({ params }: HttpContextContract) {
    const services = await Service.findOrFail(params.id);
    await services.delete();
  }
}
