import { StatusCodes } from 'http-status-codes'

// Models
import User from 'App/Models/User'

// Types
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserController {

  public async getMe({ request, response }: HttpContextContract) {
    const userId = request.decoded!.user_id
    const userQuery = User.query()

    const user = await userQuery.where('id', userId).first()
    
    if (!user) {
      return response.api({ message: 'Invalid credentials.' }, StatusCodes.UNAUTHORIZED)
    }
    return response.api(
      { user },
      StatusCodes.OK
    )
  }
}
