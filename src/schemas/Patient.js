import Joi from "joi";
import { nameRegex } from "../utils/constants/regex.js";

const patientSchema = Joi.object({
  name: Joi.string().pattern(nameRegex).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "br"] },
  }).required(),
  password: Joi.string().required(),
});

export default patientSchema;
