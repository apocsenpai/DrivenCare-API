import errors from "../errors/index.js";
import appointmentRepository from "../repositories/appointment.repository.js";
import doctorRepository from "../repositories/doctor.repository.js";
import handleAppointmentDate from "../utils/functions/appointments/handleAppointmentDate.js";
import handleAppointmentTime from "../utils/functions/appointments/handleAppointmentTime.js";

async function create({ doctorId, patientId, date, time }) {
  const {
    rows: [doctor],
    rowCount,
  } = await doctorRepository.findById(doctorId);

  if (!rowCount) errors.unauthorizedError();

  const { checkin, checkout } = doctor;

  if (!handleAppointmentTime({ time, checkin, checkout }))
    throw errors.invalidAppointmentTime();

  if (!handleAppointmentDate(date)) throw errors.invalidAppointmentDate();

  const {
    rows: [appointment],
  } = await appointmentRepository.findByDateAndTime({ date, time, doctorId });

  if (appointment) throw errors.duplicatedAppointmentError(appointment);

  await appointmentRepository.create({ doctorId, patientId, date, time });
}

async function updateConfirmed({ appointmentId, doctorId }) {
  if (!Number(appointmentId)) throw errors.unprocessableContentError();

  await appointmentRepository.updateConfirmed({ appointmentId, doctorId });
}

async function updateCanceled({ appointmentId, doctorId }) {
  if (!Number(appointmentId)) throw errors.unprocessableContentError();

  await appointmentRepository.updateCanceled({ appointmentId, doctorId });
}

export default { create, updateConfirmed, updateCanceled };
