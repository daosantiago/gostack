import { Router } from "express";
import { startOfHour, parseISO, isEqual } from 'date-fns';

import Appointment from "../models/Appointment";

const appointementsRouter = Router();

const appointments: Appointment[] = [];

appointementsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  // Converte a hora recebida em formato string para o formato Date do JS
  // e então define uma hora redonda
  const parsedDate = startOfHour(parseISO(date));

  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
    .status(400)
    .json({ message: 'This appointment is already booked' });
  }

  const newAppointment = new Appointment(provider, parsedDate);

  appointments.push(newAppointment)

  return response.json(newAppointment);
});

export default appointementsRouter;
