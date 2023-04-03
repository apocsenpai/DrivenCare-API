import patientRepository from "../repositories/patient.repository.js";
import bcrypt from "bcrypt";
import saltRounds from "../utils/constants/saltRounds.js";
import dotenv from "dotenv";
import generateToken from "../utils/functions/token/generateToken.js";
import errors from "../errors/index.js";
import dayjs from "dayjs";

dotenv.config();

async function create({ name, email, password }) {
  const { rowCount } = await patientRepository.findByEmail({ email });

  if (rowCount) throw errors.duplicatedEmailError(email);

  const hashPassword = await bcrypt.hash(password, saltRounds);

  await patientRepository.create({ name, email, password: hashPassword });
}

async function signIn({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await patientRepository.findByEmail({ email });

  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  return generateToken({ id: user.id, status: "Patient" });
}

async function findAppointmentsById({ id }) {
  const { rows: appointments, rowCount } =
    await patientRepository.findAppointmentsByPatientId({
      id,
    });

  if (!rowCount) throw errors.appointmentsNotFound();

  return appointments.map((a) => ({
    ...a,
    date: dayjs(a.date).format("DD/MM/YYYY"),
  }));
}

async function findAppointmentsHistoric({ id }) {
  const { rows: appointments } =
    await patientRepository.findAppointmentsHistoric({
      id,
    });

  return appointments.map((a) => ({
    ...a,
    date: dayjs(a.date).format("DD/MM/YYYY"),
  }));
}

export default {
  create,
  signIn,
  findAppointmentsById,
  findAppointmentsHistoric,
};
