import { describe, expect, it } from "vitest";
import { Appointment } from "../src/entities/appoitment";
import { InMemoryAppointmentsRepository } from "../src/repositories/in-memory/in-memory-appointments-repository";
import { getFutureDate } from "../src/test/utils/get-future-date";
import { CreateAppointment } from "./create-appoitment";

describe("Create Appointment", () => {
  it("should be able to create an appointment", () => {
    1;
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-11");

    const AppointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(AppointmentsRepository);
    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt,
        endsAt,
      })
    ).resolves.toBeInstanceOf(Appointment);
  });

  it("should NOT be able to create an appointment with overlapping dates", async () => {
    1;
    const startsAt = getFutureDate("2022-08-10");
    const endsAt = getFutureDate("2022-08-15");

    const AppointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointment(AppointmentsRepository);

    await createAppointment.execute({
      customer: "John Doe",
      startsAt,
      endsAt,
    });

    expect(
      createAppointment.execute({
        customer: "John Doe",
        startsAt: getFutureDate("2022-08-14"),
        endsAt: getFutureDate("2022-08-18"),
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
