import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CardController.getAll')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.post('/', 'CardController.create')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.get('/quizz', 'LearningController.getCardsForToday')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.post('/:cardId/answer', 'LearningController.answerQuestion')
})
  .namespace('App/Controllers/Http/v1/Card')