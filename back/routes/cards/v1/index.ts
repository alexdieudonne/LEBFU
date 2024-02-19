import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', 'CardController.getAll').middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Card')
