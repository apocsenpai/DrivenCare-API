import Joi from "joi";
import { nameRegex, timeRegex } from "../utils/constants/regex.js";

const doctorSchema = Joi.object({
  name: Joi.string().pattern(nameRegex).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "br"] },
  }).required(),
  password: Joi.string().required(),
  specialty: Joi.string().required(),
  address: Joi.string().required(),
  checkIn: Joi.string().pattern(timeRegex).required(),
  checkOut: Joi.string().pattern(timeRegex).required(),
});

export default doctorSchema;