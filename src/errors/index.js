function unprocessableContentError(message) {
  return {
    name: "UnprocessableContentError",
    message,
  };
}

function duplicatedEmailError(email) {
  return {
    name: "DuplicatedEmailError",
    message: "Email already exists",
    email,
  };
}

function unauthorizedError() {
  return {
    name: "UnauthorizedError",
    message: "You must be signed in to continue",
  };
}

function invalidCredentialsError() {
  return {
    name: "InvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

function invalidDoctorAvailability() {
  return {
    name: "InvalidDoctorAvailability",
    message: "Doctor availability must be between 08:00 and 17:00",
  };
}

function invalidAppointmentTime() {
  return {
    name: "InvalidAppointmentTime",
    message:
      "Appointments must be scheduled every 30 minutes from 8 am (max 17h30)",
  };
}

function invalidAppointmentDate() {
  return {
    name: "InvalidAppointmentDate",
    message: "Appointment date must be scheduled between Mondays and Fridays",
  };
}

function duplicatedAppointmentError(appointment) {
  return {
    name: "DuplicatedAppointmentError",
    message: "Appointment already exists, try another one!",
    appointment,
  };
}

function appointmentsNotFound() {
  return {
    name: "AppointmentsNotFound",
    message: "Appointments not found",
  };
}

export default {
  invalidCredentialsError,
  duplicatedEmailError,
  unprocessableContentError,
  invalidDoctorAvailability,
  unauthorizedError,
  invalidAppointmentTime,
  invalidAppointmentDate,
  duplicatedAppointmentError,
  appointmentsNotFound,
};
