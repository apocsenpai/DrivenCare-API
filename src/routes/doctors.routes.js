import { Router } from "express";
import doctorControllers from "../controllers/doctor.controllers.js";
import authenticate from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import doctorSchema from "../schemas/Doctor.js";
import signInSchema from "../schemas/SignIn.js";

const doctorRoutes = Router();

doctorRoutes.post(
  "/signup",
  validateSchema(doctorSchema),
  doctorControllers.create
);
doctorRoutes.post(
  "/signin",
  validateSchema(signInSchema),
  doctorControllers.signIn
);
doctorRoutes.get(
  "/appointments",
  authenticate("Doctor"),
  doctorControllers.findAppointmentsById
);
doctorRoutes.get(
  "/appointments/historic",
  authenticate("Doctor"),
  doctorControllers.findAppointmentsHistoric
);

doctorRoutes.get("/", authenticate("Patient"), doctorControllers.findByParams);

export default doctorRoutes;
