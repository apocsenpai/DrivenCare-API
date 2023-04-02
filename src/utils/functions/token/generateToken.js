import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateToken = (payload) =>
  jwt.sign(payload, process.env.SECRET_JWT, {
    expiresIn: 86400,
  });

export default generateToken;
