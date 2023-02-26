/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { provider_id, date } = request.body;

    // Converte a hora recebida em formato string para o formato Date do JS
    // e então define uma hora redonda
    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);

    const newAppointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(newAppointment);
  }
}
