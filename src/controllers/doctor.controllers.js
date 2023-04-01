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

export default { create, signIn };
