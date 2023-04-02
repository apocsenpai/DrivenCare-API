import Joi from "joi";
import { timeRegex } from "../utils/constants/regex.js";

const appointmentSchema = Joi.object({
  date: Joi.date().required(),
  time: Joi.string().pattern(timeRegex).required(),
});

export default appointmentSchema;