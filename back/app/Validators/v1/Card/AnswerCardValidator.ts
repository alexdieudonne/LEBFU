
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AnswerCardValidator {
    constructor(protected ctx: HttpContextContract) { }

    public schema = schema.create({
        answer: schema.string({ trim: true }, [
            rules.minLength(1),
            rules.maxLength(255)
        ]),
    })

    public messages: CustomMessages = {
        'required': '{{ field }} cannot be empty.',
        'answer.maxLength': 'The answer cannot exceed 255 characters.',
    }
}