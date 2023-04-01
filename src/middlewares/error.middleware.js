import httpStatus from "http-status";

const {
  UNAUTHORIZED,
  UNPROCESSABLE_ENTITY,
  CONFLICT,
  INTERNAL_SERVER_ERROR,
} = httpStatus;

function handleServerErrors(err, req, res, next) {

  if (err.name === "UnprocessableContentError")
    return res.status(UNPROCESSABLE_ENTITY).send({ message: err.message });

  if (err.name === "DuplicatedEmailError")
    return res
      .status(CONFLICT)
      .send({ message: err.message, email: err.email });

  if (err.name === "invalidCredentialsError")
    return res.status(UNAUTHORIZED).send({ message: err.message });

  return res
    .status(INTERNAL_SERVER_ERROR)
    .send({ message: `Internal Server Error :(` });
}

export default handleServerErrors;
