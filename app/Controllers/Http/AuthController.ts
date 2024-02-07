/**
 * @swagger
 * tags:
 *   name: Authorization
 *   description: Endpoints para manipulação de Auth
 */

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class AuthController {
  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: Autentica um usuário e retorna um token de acesso
   *     tags: [Authorization]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *             required:
   *               - email
   *               - password
   *     responses:
   *       200:
   *         description: Token de acesso gerado com sucesso
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   description: Token de acesso gerado para o usuário autenticado
   */
  public async store({ request, auth }: HttpContextContract) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password, {
      expiresIn: "30 days",
    });

    return token;
  }

  /**
   * @swagger
   * /auth/logout:
   *   post:
   *     summary: Encerra a sessão do usuário autenticado
   *     tags: [Authorization]
   *     security:
   *       - bearerAuth: []
   *     responses:
   *       204:
   *         description: Sessão do usuário encerrada com sucesso
   */
  public async destroy({ auth }: HttpContextContract) {
    await auth.logout();
  }
}
