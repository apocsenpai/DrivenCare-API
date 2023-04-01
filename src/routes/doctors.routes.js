import { Router } from "express";
import patientControllers from "../controllers/patient.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import doctorSchema from "../schemas/Doctor.js";
import signInSchema from "../schemas/SignIn.js";

const doctorRoutes = Router();

doctorRoutes.post("/signup", validateSchema(doctorSchema), patientControllers.create);
doctorRoutes.post("/signin", validateSchema(signInSchema), patientControllers.signIn)

export default doctorRoutes;