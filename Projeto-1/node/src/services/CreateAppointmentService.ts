import { startOfHour } from "date-fns";
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

/**
 * Recebimento de informações
 * Tratar erros e exceções
 * Acesso ao Repositório
 */

interface RequestDTO {
  provider: string;
  date: Date;
}

// Somente um método dentro do service
// Um Service não deve ter acesso ao request ou response
class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;

  /**
   * Dependency Inversion (SOLID)
   * Invés de instanciar um repositório, o service recebe um respositório no constructor
   */
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ provider, date }: RequestDTO): Appointment {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      // retorna um erro, que será tratado no Routes
      throw Error('This appointment is already booked');
    }

    const newAppointment = this.appointmentsRepository.create({
      provider,
      date: appointmentDate,
    });

    return newAppointment;
  }
}

export default CreateAppointmentService;
