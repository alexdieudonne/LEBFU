import Route from '@ioc:Adonis/Core/Route'
import AutoSwagger from "adonis-autoswagger";
import swagger from "Config/swagger";

Route.group(() => {
  require('./v1')
}).prefix('/public')

// returns swagger in YAML
Route.get("/swagger", async () => {
  return AutoSwagger.docs(Route.toJSON(), swagger);
});

// Renders Swagger-UI and passes YAML-output of /swagger
Route.get("/docs", async () => {
  return AutoSwagger.ui("/swagger", swagger);
});