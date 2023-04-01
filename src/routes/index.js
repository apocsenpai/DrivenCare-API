import { Router } from "express";
import doctorRoutes from "./doctors.routes.js";
import patientRoutes from "./patients.routes.js";

const routes = Router();

routes.use("/patients", patientRoutes);
routes.use("/doctors", doctorRoutes);

export default routes;