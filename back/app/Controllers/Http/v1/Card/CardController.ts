import { StatusCodes } from 'http-status-codes'

// Types
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Cards from 'App/Models/Cards'
import { CardsCategoryEnum } from 'App/Types/Enums/CardsCategoryEnum'
import UserCard from 'App/Models/UserCard'

export default class CardController {

  public async getAll({ response }: HttpContextContract) {
    const cardsQuery = Cards.query()

    const cards = await cardsQuery.select('*')

    if (!cards) {
      return response.api({ message: 'No cards' }, StatusCodes.UNAUTHORIZED)
    }
    return response.api(
      { cards },
      StatusCodes.OK
    )
  }

  public async create({ request, response }: HttpContextContract) {
    const { question, answer, tag } = request.body()

    const userId = request.decoded!.user_id

    const card = new Cards()
    card.question = question
    card.answer = answer
    card.category = CardsCategoryEnum.FIRST
    card.tag = tag

    const userCard = new UserCard()
    userCard.userId = userId
    userCard.cardId = card.id

    await userCard.save()
    await card.save()

    return response.api(
      { card },
      StatusCodes.CREATED
    )
  }

  public async getOne({ request, response }: HttpContextContract) {
    const { id } = request.params()
    try {
      const card = await Cards.find(id)

      if (!card) {
        return response.api({ message: 'No card' }, StatusCodes.UNAUTHORIZED)
      }
      return response.api(
        { card },
        StatusCodes.OK
      )
    } catch (error) {
      return response.api({ message: 'Error' }, StatusCodes.UNAUTHORIZED)
    }
  }

  public async update({ request, response }: HttpContextContract) {
    const { question, answer, tag } = request.body()
    const { id } = request.params()

    try {
      const card = await Cards.find(id)

      if (!card) {
        return response.api({ message: 'No card' }, StatusCodes.UNAUTHORIZED)
      }

      if (question)
        card.question = question
      if (answer)
        card.answer = answer
      if (tag)
        card.tag = tag

      await card.save()

      return response.api(
        { card },
        StatusCodes.OK
      )
    } catch (error) {
      return response.api({ message: 'Error' }, StatusCodes.UNAUTHORIZED)
    }
  }

  public async answerCard({ request, response }: HttpContextContract) {
    const { answer } = request.body()
    const { id } = request.params()

    try {
      const card = await Cards.find(id)
      if (!card) {
        return response.api({ message: 'No card' }, StatusCodes.UNAUTHORIZED)
      }

      if (card.answer === answer) {
        card.category = CardsCategoryEnum[CardsCategoryEnum[card.category] + 1]
      } else {
        card.category = CardsCategoryEnum.FIRST
      }

      await card.save()
      return response.api(
        { card },
        StatusCodes.OK
      )
    } catch (error) {
      return response.api({ message: 'Error' }, StatusCodes.UNAUTHORIZED)
    }


  }

}
