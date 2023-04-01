import { Router } from "express";
import patientControllers from "../controllers/patient.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import patientSchema from "../schemas/Patient.js";
import signInSchema from "../schemas/SignIn.js";

const patientRoutes = Router();

patientRoutes.post("/signup", validateSchema(patientSchema), patientControllers.create);
patientRoutes.post("/signin", validateSchema(signInSchema), patientControllers.signIn)

export default patientRoutes;