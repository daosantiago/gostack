import { Router } from "express";
import appointmentsRouter from "./appointments.routes";
import usersRouter from "./users.routes";

const routes = Router();

// Redireciona as rotas de '/appointments' para appointementsRouter
routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);

export default routes;
