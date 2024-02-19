import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/register', 'AuthsController.signUpWithPassword')
  Route.post('/login', 'AuthsController.signInWithPassword')
  Route.post('/forgot-password', 'AuthsController.forgotPassword')
  Route.post('/refresh', 'AuthsController.refreshSession').middleware('userSession')
  Route.delete('/logout', 'AuthsController.signOut').middleware('userSession')
})
  .namespace('App/Controllers/Http/v1/Auth')
