import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCardValidator {
    constructor(protected ctx: HttpContextContract) {}

    public schema = schema.create({
        question: schema.string({ trim: true }, [
            rules.minLength(1),
            rules.maxLength(255)
        ]),
        answer: schema.string({ trim: true }, [
            rules.minLength(1),
            rules.maxLength(255)
        ]),
        tag: schema.string.optional({ trim: true }, [
            rules.maxLength(50)
        ]),
    })

    public messages: CustomMessages = {
        'required': '{{ field }} cannot be empty.',
        'question.maxLength': 'The question cannot exceed 255 characters.',
        'answer.maxLength': 'The answer cannot exceed 255 characters.',
        'tag.maxLength': 'The tag cannot exceed 50 characters.',
    }
}
