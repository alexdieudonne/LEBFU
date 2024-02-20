import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CardController.getAll').middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.post('/', 'CardController.create').middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.get('/:id', 'CardController.getOne').middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.patch('/:id', 'CardController.update').middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')

Route.group(() => {
  Route.delete('/:id', 'CardController.delete').middleware('userSession')
})

Route.group(() => {
  Route.post('/:id/answer', 'CardController.answerCard').middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')

