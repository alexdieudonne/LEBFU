import { CardsCategoryEnum } from "./CategoryCard"

export type Card = {
    "id": string,
    "category": CardsCategoryEnum,
    "question": string,
    "answer": string,
    "tag": string
}

export type CreateCardRequest = Omit<Card, "id" | "category">

export type CardAnswerResponse = {
    "isValid": true
}