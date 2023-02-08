import { Appointment } from "../entities/appoitment";

export interface AppointmentRepository {
  create(appointment: Appointment): Promise<void>;
  findOverlappingAppointment(
    startsAt: Date,
    endsAt: Date
  ): Promise<Appointment | null>;
}
