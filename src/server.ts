import { app } from "./app";
import { logger } from "./config/logger";

app.listen(process.env.PORT || 8081, () => {
  logger.info(`Servidor em execucao na porta ${process.env.PORT}`);
});
