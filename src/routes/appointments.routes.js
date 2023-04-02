import { Router } from "express";
import appointmentControllers from "../controllers/appointment.controllers.js";
import authenticate from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import appointmentSchema from "../schemas/Appointment.js";

const appointmentsRoutes = Router();

appointmentsRoutes.post("/:doctorId", authenticate('Patient'), validateSchema(appointmentSchema), appointmentControllers.create);

appointmentsRoutes.put("/:appointmentId/confirm", authenticate('Doctor'), appointmentControllers.updateConfirmed);
appointmentsRoutes.put("/:appointmentId/cancel", authenticate('Doctor'), appointmentControllers.updateCanceled);

export default appointmentsRoutes;
