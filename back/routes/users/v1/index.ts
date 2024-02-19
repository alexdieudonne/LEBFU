import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/me', 'UserController.getMe').middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Auth')

