import { StatusCodes } from 'http-status-codes'
import Database from '@ioc:Adonis/Lucid/Database'
import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import JwtService from 'App/Services/JwtService'
import { cuid } from '@ioc:Adonis/Core/Helpers'


// Validators
import RegisterWithPasswordValidator from 'App/Validators/v1/Auth/RegisterWithPasswordValidator'
import LoginWithPasswordValidator from 'App/Validators/v1/Auth/LoginWithPasswordValidator'
import LogoutValidator from 'App/Validators/v1/Auth/LogoutValidator'
import RefreshSessionValidator from 'App/Validators/v1/Auth/RefreshSessionValidator'

// Models
import User from 'App/Models/User'
import Session from 'App/Models/Session'
import RefreshToken from 'App/Models/RefreshToken'

// Types
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthsController {
  private jwt = new JwtService()

  public async signUpWithPassword({ request, response }: HttpContextContract) {
    const payload = await request.validate(RegisterWithPasswordValidator)

    if (!payload.email) {
      return response.api({ message: 'Some fields cannot be empty.' }, StatusCodes.BAD_REQUEST)
    }

    try {
      await Database.transaction(async (trx) => {
        const user = await User.create(
          {
            email: payload.email,
            encryptedPassword: payload.password
          },
          { client: trx }
        )

        return {
          user,
        }
      })
      return response.api(
        {
          message: `Account created,`
        },
        StatusCodes.CREATED
      )
    } catch (e) {
      return response.api({ message: 'Failed to create account.' }, StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  public async signInWithPassword({ request, response }: HttpContextContract) {
    const payload = await request.validate(LoginWithPasswordValidator)
    const headers = request.headers()

    const userQuery = User.query()

    if (!payload.email) {
      return response.api({ message: 'Email cannot be empty.' }, StatusCodes.BAD_REQUEST)
    }

    if (payload.email) {
      userQuery.where('email', payload.email)
    }

    const user = await userQuery.first()

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


  public async signOut({ request, response }: HttpContextContract) {
    const payload = await request.validate(LogoutValidator)
    const userId = request.decoded!.user_id
    const sessionId = request.decoded!.session_id

    const sessions = await Database.transaction(async (trx) => {
      const currentSession = await Session.query({ client: trx })
        .where('user_id', userId)
        .andWhere('id', sessionId)
        .first()

      const allSession = await Session.query({ client: trx }).where('user_id', userId).exec()

      return {
        currentSession,
        allSession,
      }
    })

    try {
      if (!sessions.currentSession) {
        return response.api(
          { message: 'Invalid session, please login again.' },
          StatusCodes.UNAUTHORIZED
        )
      }

      if (payload.scope === 'global') {
        sessions.allSession.map(async (session) => {
          await session.delete()
        })
      }

      if (payload.scope === 'others') {
        sessions.allSession.map(async (session) => {
          if (session.id !== sessions.currentSession!.id) await session.delete()
        })
      }

      if (payload.scope === 'local') {
        await sessions.currentSession.delete()
      }

      return response.api({ message: '' }, StatusCodes.NO_CONTENT)
    } catch (e) {
      return response.api({ message: `704: ${e}` }, StatusCodes.INTERNAL_SERVER_ERROR)
    }
  }

  public async refreshSession({ request, response }: HttpContextContract) {
    const payload = await request.validate(RefreshSessionValidator)
    const userId = request.decoded!.user_id
    const sessionId = request.decoded!.session_id
    const ip = request.ips()[0]

    const session = await Session.query().where('user_id', userId).andWhere('id', sessionId).first()

    if (!session || session!.ip !== ip) {
      return response.api(
        { message: 'Invalid session, please login again.' },
        StatusCodes.UNAUTHORIZED
      )
    }

    const refreshToken = await RefreshToken.query()
      .where('user_id', userId)
      .andWhere('session_id', sessionId)
      .andWhere('token', payload.refresh_token)
      .first()

    if (!refreshToken || refreshToken?.revoked) {
      return response.api({ message: 'Invalid refresh token.' }, StatusCodes.FORBIDDEN)
    }

    const refreshSession = await Database.transaction(async (trx) => {
      refreshToken.useTransaction(trx)

      refreshToken.revoked = true
      await refreshToken.save()

      if (session) {
        session.useTransaction(trx)
        session.refreshedAt = DateTime.now()
        await session.save()
      }

      const newRefreshToken = await RefreshToken.create(
        {
          userId: userId,
          sessionId: sessionId,
          parent: refreshToken.id,
          revoked: false,
          token: cuid(),
        },
        { client: trx }
      )

      return {
        newRefreshToken,
      }
    })

    if (refreshSession.newRefreshToken) {
      const accessToken = this.jwt.generate({ user_id: userId, session_id: sessionId }).make()

      return response.api(
        {
          access_token: accessToken,
          refreshToken: refreshSession.newRefreshToken.token,
        },
        StatusCodes.OK
      )
    } else {
      return response.api(
        { message: 'Failed to refresh session.' },
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    }
  }
}
