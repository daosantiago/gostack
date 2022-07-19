import { Router } from "express";
import { parseISO } from 'date-fns';

import AppointmentsRepository from "../repositories/AppointmentsRepository";
import CreateAppointmentService from "../services/CreateAppointmentService";

const appointementsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// Rota: Receber a requisição, chamar outro arquivo, devolver uma resposta
appointementsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointementsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    // Converte a hora recebida em formato string para o formato Date do JS
    // e então define uma hora redonda
    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    const newAppointment = createAppointment.execute({ provider, date: parsedDate });

    return response.json(newAppointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default appointementsRouter;
