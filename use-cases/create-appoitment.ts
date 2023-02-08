import { Appointment } from "../src/entities/appoitment";
import { AppointmentRepository } from "../src/repositories/appointments-repository";

interface CreateAppointmentRequest {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}
type CreateAppointmentResponse = Appointment;

export class CreateAppointment {
  constructor(private AppointmentsRepository: AppointmentRepository) {}
  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment =
      await this.AppointmentsRepository.findOverlappingAppointment(
        startsAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error("This appointment is already booked");
    }
    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    await this.AppointmentsRepository.create(appointment);
    return appointment;
  }
}
