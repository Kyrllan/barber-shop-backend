/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

Route.resource("service", "ServicesController")
  .apiOnly()
  .middleware({
    store: ["acl:admin"],
    update: ["acl:admin"],
    destroy: ["acl:admin"],
  });
Route.resource("user", "UsersController").apiOnly();
Route.resource("schedule", "SchedulesController")
  .apiOnly()
  .middleware({
    store: ["auth"],
    update: ["auth"],
    destroy: ["auth"],
  });
Route.resource("time", "TimesController")
  .apiOnly()
  .middleware({
    store: ["acl:admin"],
    update: ["acl:admin"],
    destroy: ["acl:admin"],
  });
Route.group(() => {
  Route.post("/login", "AuthController.store");
  Route.delete("/logout", "AuthController.destroy").middleware("auth");
}).prefix("auth");
