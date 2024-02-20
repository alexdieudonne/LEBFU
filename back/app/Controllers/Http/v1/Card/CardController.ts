import { StatusCodes } from 'http-status-codes'

// Types
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cards from 'App/Models/Cards'
import { CardsCategoryEnum } from 'App/Types/Enums/CardsCategoryEnum'
import CreateCardValidator from 'App/Validators/v1/Card/CreateCardValidator'

export default class CardController {

  public async getAll({ response }: HttpContextContract) {
    const cardsQuery = Cards.query()

    const cards = await cardsQuery.select('*')

    if (cards.length === 0) {
      return response.status(StatusCodes.NOT_FOUND).json('No cards found.')
    }
    return response.status(StatusCodes.OK).json({ cards })
  }

  public async create({ request, response }: HttpContextContract) {

    const payload = await request.validate(CreateCardValidator)

    const card = new Cards()
    card.question = payload.question
    card.answer = payload.answer
    card.category = CardsCategoryEnum.FIRST
    if (payload.tag)
      card.tag = payload.tag

    await card.save()

    return response.status(StatusCodes.CREATED).json(card)
  }
}
