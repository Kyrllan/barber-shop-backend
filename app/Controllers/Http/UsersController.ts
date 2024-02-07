/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints para manipulação de usuários
 */

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import User from "App/Models/User";

export default class UsersController {
  /**
   * @swagger
   * /user:
   *   get:
   *     summary: Lista todos os usuários
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: Lista de usuários
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/User'
   */
  public async index({}: HttpContextContract) {
    const users = await User.all();
    return users;
  }

  /**
   * @swagger
   * /user:
   *   post:
   *     summary: Cria um novo usuário
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: Usuário criado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   */
  public async store({ request }: HttpContextContract) {
    const data = request.only([
      "name",
      "email",
      "password",
      "cpf",
      "phone",
      "role",
    ]);
    const user = await User.create(data);
    return user;
  }

  /**
   * @swagger
   * /user/{id}:
   *   get:
   *     summary: Obtém um usuário específico
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: ID do usuário
   *     responses:
   *       200:
   *         description: Usuário encontrado
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Usuário não encontrado
   */
  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    return user;
  }

  /**
   * @swagger
   * /user/{id}:
   *   put:
   *     summary: Atualiza um usuário existente
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: ID do usuário
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/User'
   *     responses:
   *       200:
   *         description: Usuário atualizado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/User'
   *       404:
   *         description: Usuário não encontrado
   */
  public async update({ params, request }: HttpContextContract) {
    const data = request.only([
      "name",
      "email",
      "password",
      "cpf",
      "phone",
      "role",
    ]);
    const user = await User.findOrFail(params.id);
    user.merge(data);
    await user.save();
    return user;
  }

  /**
   * @swagger
   * /user/{id}:
   *   delete:
   *     summary: Exclui um usuário existente
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           format: int64
   *         description: ID do usuário
   *     responses:
   *       204:
   *         description: Usuário excluído com sucesso
   *       404:
   *         description: Usuário não encontrado
   */
  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id);
    await user.delete();
  }
}
