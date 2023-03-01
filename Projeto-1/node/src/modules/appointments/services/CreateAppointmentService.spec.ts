import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '321321321',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('321321321');
  });

  it('should not be able to create two appointment in the same datetime', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );

    const appointmentDate = new Date(2023, 2, 1, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '321321321',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '321321321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
