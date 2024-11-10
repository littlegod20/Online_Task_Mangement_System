import express, { Application } from "express";
import cors from "cors";
import { Database } from "./services/databaseClass.service";
import { passwordValidator } from "./middlewares/validators";
import authentication_routes from "./routes/authentication.routes";
import tasks_routes from "./routes/tasks.routes";
import user_routes from './routes/user.routes'
import { protectApiRoutes } from "./middlewares/protectApiRoutes";
import dotenv from "dotenv";

export const app: Application = express();
dotenv.config();
async function startServer() {
  try {
    app.use(cors());
    const mongodb = new Database();
    await mongodb._connect();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // routes for signing and logging In
    app.use("/api/auth", passwordValidator, authentication_routes);

    // middleware for verifying token
    app.use(protectApiRoutes);
    app.use("/api/tasks", tasks_routes);
    app.use("/api/user", user_routes);

    app.listen(process.env.PORT, () => {
      console.log(`Server listening on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
