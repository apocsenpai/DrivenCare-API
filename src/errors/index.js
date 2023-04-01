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

function invalidCredentialsError() {
  return {
    name: "IvalidCredentialsError",
    message: "Email or password are incorrect",
  };
}

export default {
    invalidCredentialsError,
    duplicatedEmailError,
    unprocessableContentError
}