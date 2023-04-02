import httpStatus from "http-status";

const { UNAUTHORIZED, UNPROCESSABLE_ENTITY, CONFLICT, INTERNAL_SERVER_ERROR } =
  httpStatus;

function handleServerErrors(err, req, res, next) {
  if (
    err.name === "UnprocessableContentError" ||
    err.name === "InvalidDoctorAvailability" ||
    err.name === "InvalidAppointmentTime" ||
    err.name === "InvalidAppointmentDate"
  )
    return res.status(UNPROCESSABLE_ENTITY).send({ message: err.message });

  if (
    err.name === "DuplicatedEmailError" ||
    err.name === "DuplicatedAppointmentError"
  )
    return res.status(CONFLICT).send(err);

  if (
    err.name === "InvalidCredentialsError" ||
    err.name === "UnauthorizedError"
  )
    return res.status(UNAUTHORIZED).send({ message: err.message });

  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: `Internal Server Error :(` });
}

export default handleServerErrors;
