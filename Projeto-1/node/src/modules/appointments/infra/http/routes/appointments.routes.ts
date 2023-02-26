/* eslint-disable camelcase */
import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from './controllers/AppointmentsController';

const appointementsRouter = Router();
const appointmentsController = new AppointmentsController();

// Usar o middleware definido para autenticação
// Se não estiver autenticado, nem chega nas rotas
appointementsRouter.use(ensureAuthenticated);

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta
// appointementsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointementsRouter.post('/', appointmentsController.create);

export default appointementsRouter;
