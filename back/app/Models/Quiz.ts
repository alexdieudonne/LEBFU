import { BaseModel, BelongsTo, beforeCreate, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { CardsCategoryEnum } from 'App/Types/Enums/CardsCategoryEnum'
import { v4 as uuidv4 } from 'uuid';
import Cards from './Cards';

// Types
import type { DateTime } from 'luxon'
import User from './User';

export default class Quiz extends BaseModel {
  public static table = 'quizes'
  public static selfAssignPrimaryKey = true

  // auto generated
  @column({ isPrimary: true, })
  public id: string

  @column()
  public cardIds: string[]

  @column()
  public userId: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Cards)
  public card: BelongsTo<typeof Cards>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(model: Quiz) {
    model.id = uuidv4()
  }
}
