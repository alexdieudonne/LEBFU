import Factory from "@ioc:Adonis/Lucid/Factory";
import Cards from "App/Models/Cards";
import { CardsCategoryEnum } from "App/Types/Enums/CardsCategoryEnum";
import { DateTime } from "luxon";


export const CardFactory = Factory.define(Cards, ({ faker }) => ({
    question: faker.lorem.sentence(),
    answer: faker.lorem.sentence(),
    category: CardsCategoryEnum.FIRST,
    tag: faker.lorem.word(),
    created_at: DateTime.now().toSQL(),
    updated_at: DateTime.now().toSQL(),
  })).build()
  