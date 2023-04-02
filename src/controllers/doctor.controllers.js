import doctorServices from "../services/doctor.services.js";

async function create(req, res, next) {
  const { name, email, password, specialty, address, checkIn, checkOut } =
    req.body;

  try {
    await doctorServices.create({
      name,
      email,
      password,
      specialty,
      address,
      checkIn,
      checkOut,
    });

    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
}

async function signIn(req, res, next) {
  const { email, password } = req.body;

  try {
    const token = await doctorServices.signIn({ email, password });

    res.send(token);
  } catch (error) {
    next(error);
  }
}

async function findAppointmentsById(req, res, next) {
  const { id } = res.locals.user;

  try {
    const appointments = await doctorServices.findAppointmentsById({ id });

    res.send(appointments);
  } catch (error) {
    next(error);
  }
}

async function findByParams(req, res, next) {
  const { name, specialty, address } = req.query;
  
  try {
    const doctors = await doctorServices.findByParams({
      name,
      specialty,
      address,
    });

    res.send(doctors);
  } catch (error) {
    next(error);
  }
}

export default { create, signIn, findAppointmentsById, findByParams };
