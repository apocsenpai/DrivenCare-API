import errors from "../errors/index.js";
import appointmentRepository from "../repositories/appointment.repository.js";
import handleAppointmentDate from "../utils/functions/appointments/handleAppointmentDate.js";
import handleAppointmentTime from "../utils/functions/appointments/handleAppointmentTime.js";

async function create({ doctorId, patientId, date, time }) {
  if (!handleAppointmentTime(time)) throw errors.invalidAppointmentTime();

  if (!handleAppointmentDate(date)) throw errors.invalidAppointmentDate();

  const {
    rows: [appointment],
  } = await appointmentRepository.findByDateAndTime({ date, time, doctorId });

  if (appointment) throw errors.duplicatedAppointmentError(appointment);

  await appointmentRepository.create({ doctorId, patientId, date, time });
}

export default { create };