/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/**
 * Recebimento de informações
 * Tratar erros e exceções
 * Acesso ao Repositório
 */

interface IRequestDTO {
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

  // Coloca um private antes da variável pra não precisar criar antes
  // Assim uma variável é criada automaticamente. Pode usar this.appointmentsRepository
  // Desativado a regra "no-useless-constructor": "off",
  constructor(private appointmentsRepository: IAppointmentsRepository) {}

  public async execute({
    provider_id,
    date,
  }: IRequestDTO): Promise<Appointment> {
    // const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate =
      await this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      // retorna um erro, que será tratado no Routes
      throw new AppError('This appointment is already booked');
    }

    const newAppointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
