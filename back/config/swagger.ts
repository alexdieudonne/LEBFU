// for AdonisJS v6
// ---

export default {
  // path: __dirname + "/../", for AdonisJS v5
  path: __dirname + "/../",  // for AdonisJS v6
  title: "Swagger API",
  version: "1.0.0",
  tagIndex: 2,
  snakeCase: true,
  ignore: ["/swagger", "/docs", "/admin", "/"],
  preferredPutPatch: "PUT", // if PUT/PATCH are provided for the same route, prefer PUT
  common: {
    parameters: {}, // OpenAPI conform parameters that are commonly used
    headers: {}, // OpenAPI conform headers that are commonly used
  },
  persistAuthorization: true, // persist authorization between reloads on the swagger page
};