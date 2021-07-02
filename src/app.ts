import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { gradeRouter } from "./routes/gradeRouter";
import { logger } from "./config/logger";
import { db } from "./models/index";

import swaggerUi from "swagger-ui-express";
const swaggerDocument = require("../swagger.json");

(async () => {
  try {
    await db.mongoose.connect(db.url, db.options);
    logger.info("Conectado ao banco de dados");
  } catch (error) {
    logger.error(`Erro ao conectar no banco de dados! ${error}`);
    process.exit();
  }
})();

const app = express();

//define o dominio de origem para consumo do servico
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
/* app.use(
  cors({
    origin: "https://grades-app-desafio04.herokuapp.com",
    //origin: "http://localhost:3000",
  }) 
);*/

app.use(gradeRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_, res: Response) => {
  res.json("Bem vindo à grade API");
});

export { app };
