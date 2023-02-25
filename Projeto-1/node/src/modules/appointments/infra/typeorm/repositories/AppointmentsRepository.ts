/* eslint-disable camelcase */
import { getRepository, Repository } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  // private appointments: Appointment[] = [];
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  private ormRepository: Repository<Appointment>;

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }
  // Durante a aula "Reescrevendo repositórios" este repositório começou a quebrar a aplicação
  // https://app.rocketseat.com.br/node/nivel-04/group/arquitetura-e-ddd/lesson/reescrevendo-repositorios

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    // const findAppointment = this.appointments.find(appointment =>
    //   isEqual(date, appointment.date),
    // );
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
