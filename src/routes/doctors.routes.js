import { Router } from "express";
import doctorControllers from "../controllers/doctor.controllers.js";
import { validateSchema } from "../middlewares/validateSchema.middleware.js";
import doctorSchema from "../schemas/Doctor.js";
import signInSchema from "../schemas/SignIn.js";

const doctorRoutes = Router();

doctorRoutes.post("/signup", validateSchema(doctorSchema), doctorControllers.create);
doctorRoutes.post("/signin", validateSchema(signInSchema), doctorControllers.signIn)

export default doctorRoutes;