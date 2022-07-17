import { Router } from "express";
import appointmentsRouter from "./appointments.routes";

const routes = Router();

// Redireciona as rotas de '/appointments' para appointementsRouter
routes.use('/appointments', appointmentsRouter);

export default routes;
