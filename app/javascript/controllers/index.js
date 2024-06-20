// This file is auto-generated by ./bin/rails stimulus:manifest:update
// Run that command whenever you add a new controller or create them with
// ./bin/rails generate stimulus controllerName

import { application } from "./application"

import DashboardController from "./dashboard_controller"
application.register("dashboard", DashboardController)

import HomeController from "./home_controller"
application.register("home", HomeController)

import MaterialFormController from "./material_form_controller"
application.register("material-form", MaterialFormController)

import MaterialsController from "./materials_controller"
application.register("materials", MaterialsController)

import ScriptController from "./script_controller"
application.register("script", ScriptController)
