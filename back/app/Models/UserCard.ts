import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { CardsCategoryEnum } from 'App/Types/Enums/CardsCategoryEnum'
import { v4 as uuidv4 } from 'uuid';

// Types
import type { DateTime } from 'luxon'
import User from './User';
import Cards from './Cards';

export default class UserCard extends BaseModel {
  public static table = 'user_cards'
  public static selfAssignPrimaryKey = true

  // auto generated
  @column({ isPrimary: true, })
  public id: string

  @column()
  public userId: string

  @column()
  public cardId: string
  
  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime
  
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Cards)
  public card: BelongsTo<typeof Cards>

  @beforeCreate()
  public static async createUUID(model: UserCard) {
    model.id = uuidv4()
  }
}
