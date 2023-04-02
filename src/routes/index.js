import { Router } from "express";
import appointmentsRoutes from "./appointments.routes.js";
import doctorRoutes from "./doctors.routes.js";
import patientRoutes from "./patients.routes.js";

const routes = Router();

routes.use("/patients", patientRoutes);
routes.use("/doctors", doctorRoutes);
routes.use("/appointments", appointmentsRoutes);

export default routes;
