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

async function updateConfirmed(req, res, next) {
  const { appointmentId } = req.params;
  const {id: doctorId} = res.locals.user;
  try {
    await appointmentServices.updateConfirmed({appointmentId, doctorId});

    res.send({ message: "Updated! :)" });
  } catch (error) {
    next(error);
  }
}

async function updateCanceled(req, res, next) {
  const { appointmentId } = req.params;
  const {id: doctorId} = res.locals.user;

  try {
    await appointmentServices.updateCanceled({appointmentId, doctorId});

    res.send({ message: "Updated! :)" });
  } catch (error) {
    next(error);
  }
}

export default { create, updateConfirmed, updateCanceled };
