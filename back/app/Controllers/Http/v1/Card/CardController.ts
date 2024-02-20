import { StatusCodes } from 'http-status-codes'

// Types
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cards from 'App/Models/Cards'

export default class CardController {

  public async getAll({ response }: HttpContextContract) {
    const cardsQuery = Cards.query()

    const cards = await cardsQuery.select('*')

    if (!cards) {
      return response.api({ message: 'No cards' }, StatusCodes.UNAUTHORIZED)
    }
    return response.api(cards, StatusCodes.OK)
  }
}
