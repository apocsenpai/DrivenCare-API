import patientServices from "../services/patient.services.js";

async function create(req, res, next) {
  const { name, email, password } = req.body;

  try {
    await patientServices.create({ name, email, password });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res, next) {
  const {email, password} = req.body;

  try {
    const token = await patientServices.signIn({email, password});

    res.send(token);
  } catch (error) {
    next(error);
  }
}

async function findAppointmentsById(req, res, next){
  const { id } = res.locals.user;

  try {
    const appointments = await patientServices.findAppointmentsById({ id });

    res.send(appointments);
  } catch (error) {
    next(error);
  }
}

export default { create, signIn, findAppointmentsById };
