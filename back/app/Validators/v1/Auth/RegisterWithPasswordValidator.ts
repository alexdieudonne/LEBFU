import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class RegisterWithPasswordValidator {
  constructor(protected ctx: HttpContextContract) {}

  public schema = schema.create({
    email: schema.string.optional({}, [
      rules.email(),
      rules.unique({
        table: 'users',
        column: 'email',
      }),
    ]),
    firstname: schema.string(),
    lastname: schema.string(),
    password: schema.string(),
  })

  public messages: CustomMessages = {
    required: '{{ field }} cannot be empty.',
    unique: '{{ field }} already exists.',
    email: '{{ field }} should be a valid email.',
  }
}
