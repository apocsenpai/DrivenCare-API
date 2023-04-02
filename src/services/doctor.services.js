import doctorRepository from "../repositories/doctor.repository.js";
import bcrypt from "bcrypt";
import saltRounds from "../utils/constants/saltRounds.js";
import dotenv from "dotenv";
import generateToken from "../utils/functions/token/generateToken.js";
import errors from "../errors/index.js";
import isCorrectAvailability from "../utils/functions/isCorrectAvailability.js";

dotenv.config();

async function create({
  name,
  email,
  password,
  specialty,
  address,
  checkIn,
  checkOut,
}) {
  const { rowCount } = await doctorRepository.findByEmail({ email });

  if (rowCount) throw errors.duplicatedEmailError(email);

  if (!isCorrectAvailability({ checkIn, checkOut }))
    throw errors.invalidDoctorAvailability();

  const hashPassword = await bcrypt.hash(password, saltRounds);

  await doctorRepository.create({
    name,
    email,
    password: hashPassword,
    specialty,
    address,
    checkIn,
    checkOut,
  });
}

async function signIn({ email, password }) {
  const {
    rowCount,
    rows: [user],
  } = await doctorRepository.findByEmail({ email });

  if (!rowCount) throw errors.invalidCredentialsError();

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw errors.invalidCredentialsError();

  return generateToken({ id: user.id, status: "Doctor" });
}

export default { create, signIn };
