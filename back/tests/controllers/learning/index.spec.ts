import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import { CardFactory } from 'Database/factories/card'
import { UserFactory } from 'Database/factories/user'

test.group('Learning index', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })


  test('Get Cards for Today', async ({ client, assert }) => {
    const response = await client.get('/cards/quizz')

    assert.isTrue(response.status() === 200 || response.status() === 404, 'Expected status code to be either 200 or 404');
  })


  test('Answer Question', async ({ client, assert }) => {
    const card = await CardFactory.create();

    const response = await client.post(`/cards/${card.id}/answer`).form({
      answer: 'Paris',
    });

    assert.isTrue(response.status() === 200 || response.status() === 400, 'Expected status code to be either 200 or 400');
    response.assert?.isBoolean;
  });

})
