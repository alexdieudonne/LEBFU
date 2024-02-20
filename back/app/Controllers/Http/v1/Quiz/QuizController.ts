import { StatusCodes } from 'http-status-codes'

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Quiz from 'App/Models/Quiz'

export default class QuizController {

    public async getAll({ response }: HttpContextContract) {

        const quizesQuery = Quiz.query()

        const quizes = await quizesQuery.select('*')

        if (!quizes) {
            return response.api({ message: 'No quizes' }, StatusCodes.UNAUTHORIZED)
        }
        return response.api(
            { quizes },
            StatusCodes.OK
        )
    }

    public async create({ request, response }: HttpContextContract) {
        const { cardIds } = request.body()
        const userId = request.decoded!.user_id
        const quizesQuery = Quiz.query()
        const todaysQuiz = await quizesQuery.select('*').where('userId', userId).where('createdAt', '>', new Date().setHours(0, 0, 0, 0)).where('createdAt', '<', new Date().setHours(23, 59, 59, 999))

        if (todaysQuiz.length > 0) {
            return response.api({ message: 'You have already created a quiz today' }, StatusCodes.UNAUTHORIZED)
        }

        const quiz = new Quiz()
        quiz.userId = userId
        quiz.cardIds = cardIds

        await quiz.save()

        return response.api(
            { quiz },
            StatusCodes.CREATED
        )
    }

    public async getOne({ request, response }: HttpContextContract) {
        const { id } = request.params()

        const quiz = await Quiz.find(id)

        if (!quiz) {
            return response.api({ message: 'No quiz' }, StatusCodes.UNAUTHORIZED)
        }
        return response.api(
            { quiz },
            StatusCodes.OK
        )
    }

}
