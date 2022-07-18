import { Router } from "express";
import { startOfHour, parseISO } from 'date-fns';

import AppointmentsRepository from "../repositories/AppointmentsRepository";

const appointementsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

appointementsRouter.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

appointementsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // Converte a hora recebida em formato string para o formato Date do JS
  // e então define uma hora redonda
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointmentsRepository.findByDate(parsedDate);

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'This appointment is already booked' });
  }

  const newAppointment = appointmentsRepository.create({
    provider,
    date: parsedDate,
  });

  return response.json(newAppointment);
});

export default appointementsRouter;
