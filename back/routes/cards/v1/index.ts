import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CardController.getAll')
  // .middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.post('/', 'CardController.create')
  // .middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.get('/quizz', 'LearningController.getCardsForToday')
  // .middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.post('/:cardId/answer', 'LearningController.answerQuestion')
  // .middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')