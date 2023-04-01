import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";
import handleServerErrors from "./middlewares/error.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(json());
app.use(routes);
app.use(handleServerErrors);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening in PORT: ${PORT}`));
