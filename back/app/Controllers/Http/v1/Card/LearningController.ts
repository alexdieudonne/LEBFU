import { StatusCodes } from "http-status-codes";

import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import Cards from "App/Models/Cards";
import { CardsCategoryEnum } from "App/Types/Enums/CardsCategoryEnum";
import { DateTime } from "luxon";
import AnswerCardValidator from "App/Validators/v1/Card/AnswerCardValidator";

export default class LearningController {

    public async getCardsForToday({ request, response }: HttpContextContract) {

        try {
            // const userId = request.decoded!.user_id;
            const today = DateTime.now();
            const cards = await Cards.query()
                // .where('userId', userId)
                .andWhere((query) => {
                    Object.values(CardsCategoryEnum).forEach((category) => {
                        const interval = this.getReviewIntervalForCategory(category as CardsCategoryEnum);
                        query.orWhere((subQuery) => {
                            subQuery
                                .where('category', category)
                                .andWhere('updatedAt', '<=', today.minus({ days: interval }).toFormat('yyyy-MM-dd HH:mm:ss'));
                        });
                    });
                });

            if (cards.length === 0) {
                return response.status(StatusCodes.NOT_FOUND).json('No cards found.');
            }

            return response.status(StatusCodes.OK).json({ cards });
        } catch (error) {
            console.log(error)
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to get cards for today.' });
        }
    }

    public async answerQuestion({ request, response }: HttpContextContract) {
        const { cardId } = request.params();

        const payload = await request.validate(AnswerCardValidator);

        try {
            const cardsQuery = Cards.query()

            const card = await cardsQuery.select('*')
                .where('id', cardId)
                .first();

            if (!card) {
                return response.status(StatusCodes.NOT_FOUND).json('card not found.')
            }

            if (!this.isCardDueForAnswer(card, DateTime.now())) {
                return response.status(StatusCodes.BAD_REQUEST).json('This question cannot be answered at the moment.');
            }

            const correct = card.answer == payload.answer;
            const newCategory = correct ? this.getNextCategory(card.category) : CardsCategoryEnum.FIRST;
            card.category = newCategory;
            await card.save();

            return response.status(StatusCodes.OK).json({ correct });
        } catch (error) {
            return response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Failed to answer question.' });
        }

    }

    private getReviewIntervalForCategory(category: CardsCategoryEnum): number {
        switch (category) {
            case CardsCategoryEnum.FIRST: return 1;
            case CardsCategoryEnum.SECOND: return 2;
            case CardsCategoryEnum.THIRD: return 4;
            case CardsCategoryEnum.FOURTH: return 8;
            case CardsCategoryEnum.FIFTH: return 16;
            case CardsCategoryEnum.SIXTH: return 32;
            case CardsCategoryEnum.SEVENTH: return 64;
            default: return 1;
        }
    }

    private getNextCategory(category: CardsCategoryEnum): CardsCategoryEnum {
        switch (category) {
            case CardsCategoryEnum.FIRST: return CardsCategoryEnum.SECOND;
            case CardsCategoryEnum.SECOND: return CardsCategoryEnum.THIRD;
            case CardsCategoryEnum.THIRD: return CardsCategoryEnum.FOURTH;
            case CardsCategoryEnum.FOURTH: return CardsCategoryEnum.FIFTH;
            case CardsCategoryEnum.FIFTH: return CardsCategoryEnum.SIXTH;
            case CardsCategoryEnum.SIXTH: return CardsCategoryEnum.SEVENTH;
            case CardsCategoryEnum.SEVENTH: return CardsCategoryEnum.SEVENTH;
            default: return CardsCategoryEnum.FIRST;
        }
    }

    private isCardDueForAnswer(card: Cards, today: DateTime): boolean {
        const interval = this.getReviewIntervalForCategory(card.category);
        return card.updatedAt <= today.minus({ days: interval });
    }

}