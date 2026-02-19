import env from "@/config/env";
import server, { logger } from "@/server";

// import { readFileSync } from "node:fs";
// import path from "node:path";
// const secret = readFileSync(path.join(__dirname, '../secret-key'));
// console.log(secret.toString('hex'));

server.listen(
  {
    port: env.PORT,
  },
  (err) => {
    if (err) {
      server.log.error(err);
      throw err;
    }
  },
);

const onCloseSignal = () => {
  logger.info("Sigint received. shutting down");
  server.close(() => {
    logger.info("Server stopped");
    process.exit();
  });

  setTimeout(() => process.exit(1), 10000).unref();
};
process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
