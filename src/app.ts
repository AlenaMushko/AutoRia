import express, { NextFunction, Request, Response } from "express";
import fileUpload from "express-fileupload";
import * as mongoose from "mongoose";
import * as swaggerUi from "swagger-ui-express";

import { configs } from "./config";
import { authRouter, carRouter, userRouter } from "./routers";
import * as swaggerJson from "./utils/swagger.json";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

const PORT = configs.PORT;

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/cars", carRouter)
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerJson));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err?.status || 500;
  return res.status(status).json({
    message: err.message,
    status,
  });
});

app.listen(PORT, () => {
  if (typeof configs.DB_URI === "string") {
    mongoose.connect(configs.DB_URI);
  } else {
    console.error("DB_URI is not defined!");
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});
