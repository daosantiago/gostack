/* eslint-disable camelcase */

import { v4 } from 'uuid';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    //Object.assign(appointment, {id: uuid(), date, provider_id});
    appointment.id = v4();
    appointment.date = date;
    appointment.provider_id = provider_id;

    this.appointments.push(appointment);

    return appointment;
  }

  // Durante a aula "Reescrevendo repositórios" este repositório começou a quebrar a aplicação
  // https://app.rocketseat.com.br/node/nivel-04/group/arquitetura-e-ddd/lesson/reescrevendo-repositorios

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const fondAppointment = this.appointments.find(
      appointment => appointment.date === date,
    );

    return fondAppointment;
  }
}

export default AppointmentsRepository;
