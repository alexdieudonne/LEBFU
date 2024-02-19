import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import JwtService from 'App/Services/JwtService'
import { StatusCodes } from 'http-status-codes'

// Models
import Session from 'App/Models/Session'

export default class UserSessionMiddleware {
  public jwtService = new JwtService()

  public async handle({ request, response }: HttpContextContract, next: () => Promise<void>) {
    const headers = request.headers()
    const headerAuthorization = headers['authorization'] as string | undefined
    // Get token from request headers
    const token = headerAuthorization?.split(' ')[1]
    // If token is not present, return unauthorized
    if (!token) {
      return response.api({ message: 'Token cannot be empty' }, StatusCodes.UNAUTHORIZED)
    }

    // Verify token
    const decoded = this.jwtService.verify(token).extract()

    const session = await Session.query()
      .where('user_id', decoded['user_id'])
      .andWhere('id', decoded['session_id'])
      .first()

    if (!session) {
      return response.api(
        { message: 'Invalid session, please login again.' },
        StatusCodes.UNAUTHORIZED
      )
    }

    request.decoded = {
      user_id: decoded['user_id'],
      session_id: decoded['session_id'],
    }

    await next()
  }
}
