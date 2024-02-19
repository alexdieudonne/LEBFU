import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { CardsCategoryEnum } from 'App/Types/Enums/CardsCategoryEnum'
import { v4 as uuidv4 } from 'uuid';

// Types
import type { DateTime } from 'luxon'

export default class Cards extends BaseModel {
  public static table = 'cards'
  public static selfAssignPrimaryKey = true

  // auto generated
  @column({ isPrimary: true, })
  public id: string

  @column()
  public question: string

  @column()
  public category: CardsCategoryEnum

  @column()
  public answer: string

  @column()
  public tag: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeCreate()
  public static async createUUID(model: Cards) {
    model.id = uuidv4()
  }
}
