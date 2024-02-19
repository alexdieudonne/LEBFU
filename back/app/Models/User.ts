import { BaseModel, beforeSave, hasMany, column } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'

// Models
import Session from './Session'
import RefreshToken from './RefreshToken'

// Types
import type { HasMany } from '@ioc:Adonis/Lucid/Orm'
import type { DateTime } from 'luxon'

export default class User extends BaseModel {
  public static table = 'users'

  @column({ isPrimary: true })
  public id: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public encryptedPassword: string

  @column.dateTime()
  public lastSignInAt: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.encryptedPassword) {
      user.encryptedPassword = await Hash.make(user.encryptedPassword!)
    }
  }

  // Relationships
  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>

  @hasMany(() => RefreshToken)
  public refresh_tokens: HasMany<typeof RefreshToken>
}
