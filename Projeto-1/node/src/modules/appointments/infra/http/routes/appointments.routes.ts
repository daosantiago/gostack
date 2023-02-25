/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointementsRouter = Router();

// Usar o middleware definido para autenticação
// Se não estiver autenticado, nem chega nas rotas
appointementsRouter.use(ensureAuthenticated);

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta
// appointementsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointementsRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();
  const { provider_id, date } = request.body;

  // Converte a hora recebida em formato string para o formato Date do JS
  // e então define uma hora redonda
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService(
    appointmentsRepository,
  );

  const newAppointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(newAppointment);
});

export default appointementsRouter;
