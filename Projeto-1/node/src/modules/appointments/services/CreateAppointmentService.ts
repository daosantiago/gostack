import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import AppError from '../../../shared/errors/AppError';

/**
 * Recebimento de informações
 * Tratar erros e exceções
 * Acesso ao Repositório
 */

interface RequestDTO {
  provider_id: string;
  date: Date;
}

// Somente um método dentro do service
// Um Service não deve ter acesso ao request ou response
class CreateAppointmentService {
  // private appointmentsRepository: AppointmentsRepository;

  // /**
  //  * Dependency Inversion (SOLID)
  //  * Invés de instanciar um repositório, o service recebe um respositório no constructor
  //  */
  // constructor(appointmentsRepository: AppointmentsRepository) {
  //   this.appointmentsRepository = appointmentsRepository;
  // }

  public async execute({
    provider_id,
    date,
  }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      // retorna um erro, que será tratado no Routes
      throw new AppError('This appointment is already booked');
    }

    const newAppointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(newAppointment);

    return newAppointment;
  }
}

export default CreateAppointmentService;
