import { Router } from "express";
import appointmentControllers from "../controllers/appointment.controllers.js";
import authenticate from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import appointmentSchema from "../schemas/Appointment.js";

const appointmentsRoutes = Router();

appointmentsRoutes.post("/:doctorId", authenticate, validateSchema(appointmentSchema), appointmentControllers.create);

export default appointmentsRoutes;
