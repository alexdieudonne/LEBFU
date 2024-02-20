import { StatusCodes } from 'http-status-codes'

// Types
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cards from 'App/Models/Cards'
import { CardsCategoryEnum } from 'App/Types/Enums/CardsCategoryEnum'

export default class CardController {

  public async getAll({ response }: HttpContextContract) {
    const cardsQuery = Cards.query()

    const cards = await cardsQuery.select('*')

    if (cards.length === 0) {
      return response.status(StatusCodes.NOT_FOUND).json( 'No cards found.')
    }
    return response.status(StatusCodes.OK).json({ cards })
  }

  public async create({ request, response }: HttpContextContract) {
    const { question, answer, tag } = request.body()

    const card = new Cards()
    card.question = question
    card.answer = answer
    card.category = CardsCategoryEnum.FIRST
    card.tag = tag

    await card.save()

    return response.status(StatusCodes.CREATED).json({ card })
  }
}
