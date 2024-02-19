import Route from '@ioc:Adonis/Core/Route'
import '../routes/users'
import '../routes/public'
import '../routes/auth'
import '../routes/admin'

Route.get('/', async ({ response }) => {
  return response.api({ message: 'Hello World' }, 200)
})
