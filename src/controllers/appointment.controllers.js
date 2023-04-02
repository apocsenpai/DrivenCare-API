import appointmentServices from "../services/appointment.services.js";

async function create(req, res, next) {
  const { doctorId } = req.params;
  const { date, time } = req.body;
  const { id: patientId } = res.locals.user;

  try {
    await appointmentServices.create({ doctorId, patientId, date, time });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

export default { create };
