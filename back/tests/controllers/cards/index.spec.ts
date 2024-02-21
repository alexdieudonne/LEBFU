import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'

test.group('Cards index', (group) => {

  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.each.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })


  test('Get all cards', async ({ assert, client }) => {
    const response = await client.get('/cards')
    response.assertStatus(200)
    response.assertBodyContains([] )
  })
  test('Create a card', async ({ assert, client }) => {
    const response = await client.post('/cards').form({
      question: 'What is the capital of France?',
      answer: 'Paris',
      tag: 'geography'
    })
    
    response.assertStatus(201)
    const card = response.body();
    assert.exists(card.id, 'ID is missing');
    assert.equal(card.question, 'What is the capital of France?');
    assert.equal(card.answer, 'Paris');
    assert.equal(card.tag, 'geography');
    assert.equal(card.category, 'FIRST');
    assert.exists(card.created_at, 'created_at is missing');
    assert.exists(card.updated_at, 'updated_at is missing');
  })
})
