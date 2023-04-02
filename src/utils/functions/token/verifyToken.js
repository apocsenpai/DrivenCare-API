import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import errors from "../../../errors/index.js";
import patientRepository from "../../../repositories/patient.repository.js";
import doctorRepository from "../../../repositories/doctor.repository.js";

dotenv.config();

const verifyToken = async (token, permissionKey) =>
  jwt.verify(token, process.env.SECRET_JWT, async (error, decoded) => {
    const { id, status } = decoded;

    const isValidStatus = status === permissionKey;

    if (error || !isValidStatus || !id) throw errors.unauthorizedError();

    const {
      rows: [user],
    } = await (status === "Patient"
      ? patientRepository.findById(id)
      : doctorRepository.findById(id));

    if (!user) throw errors.unauthorizedError();

    return {...user, status};
  });

export default verifyToken;
