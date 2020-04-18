import express from "express";
import UsersController from "../app/controllers/UsersController";
import AuthMid from "../app/middlewares/Authentication";

import routeNotFound from "./notFound";
import isContentJson from "./isContentJson";

const routes = express.Router();

routes.use(isContentJson);
routes.post("/users/signup", UsersController.signUp);
routes.post("/users/signin", UsersController.sigIn);
routes.get("/users/:id", AuthMid, UsersController.getUser);
routes.use(routeNotFound);

export default routes;
