import errors from "../errors/index.js";
import verifyToken from "../utils/functions/token/verifyToken.js";

async function authenticate(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization) throw errors.unauthorizedError();

  const authorizationParts = authorization.split(" ");
  if (authorizationParts.length !== 2) throw errors.unauthorizedError();

  const [schema, token] = authorizationParts;
  if (schema !== "Bearer") throw errors.unauthorizedError();


  try {
    res.locals.user = await verifyToken(token);

    next();
  } catch (error) {
    next(error);
  }
}

function authenticatePatient(){

}

function authenticateDoctor(){
  
}

export default authenticate;