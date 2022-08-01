import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import { getCustomRepository } from 'typeorm';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointementsRouter = Router();

// Usar o middleware definido para autenticação
// Se não estiver autenticado, nem chega nas rotas
appointementsRouter.use(ensureAuthenticated);

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta
appointementsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

appointementsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  // Converte a hora recebida em formato string para o formato Date do JS
  // e então define uma hora redonda
  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const newAppointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(newAppointment);
});

export default appointementsRouter;
