import { StatusCodes } from 'http-status-codes'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import JwtService from 'App/Services/JwtService'
import { cuid } from '@ioc:Adonis/Core/Helpers'

// Models
import User from 'App/Models/User'
import Session from 'App/Models/Session'
import RefreshToken from 'App/Models/RefreshToken'

// Types
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserController {
  private jwt = new JwtService()

  public async getMe({ request, response }: HttpContextContract) {

    const headers = request.headers()

    const user = request.user

    const userQuery = User.query()

    const user = userQuery.where('email', payload.email)

    if (!user) {
      return response.api({ message: 'Invalid credentials.' }, StatusCodes.UNAUTHORIZED)
    }

    const isPasswordValid = await Hash.verify(user.encryptedPassword, payload.password)

    if (!isPasswordValid) {
      return response.api({ message: 'Invalid credentials.' }, StatusCodes.UNAUTHORIZED)
    }

    const newSession = await Database.transaction(async (trx) => {
      user.useTransaction(trx)

      const lastSignedAt = DateTime.now()

      user.lastSignInAt = lastSignedAt

      await user.save()

      const session = await Session.create(
        {
          userId: user.id,
          userAgent: headers['user-agent'],
          ip: request.ips()[0],
        },
        { client: trx }
      )

      const refreshToken = await RefreshToken.create(
        {
          userId: user.id,
          sessionId: session.id,
          token: cuid(),
          revoked: false,
          parent: null,
        },
        { client: trx }
      )

      return {
        session,
        refreshToken,
      }
    })

    if (newSession.session && newSession.refreshToken) {
      const userToken = this.jwt
        .generate({ user_id: user.id, session_id: newSession.session.id })
        .make()
      const expiresAt = DateTime.now().plus({ days: 7 }).toUnixInteger()

      return response.api(
        {
          access_token: userToken.token,
          expires_at: expiresAt,
          refresh_token: newSession.refreshToken.token,
        },
        StatusCodes.OK
      )
    } else {
      return response.api({ message: 'Internal server error.' }, StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

}
