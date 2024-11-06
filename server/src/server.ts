import express, { Application } from "express";
import { Database } from "./services/databaseClass";
import { passwordValidator } from "./middlewares/validators";
import authentication_routes from "./routes/authentication-routes";
import tasks_routes from "./routes/tasks-routes";
import { protectApiRoutes } from "./middlewares/protectApiRoutes";

const port = 5000;
export const app: Application = express();

async function startServer() {
  try {
    const mongodb = new Database();
    await mongodb._connect();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // routes for signing and logging In
    app.use("/api/auth", passwordValidator, authentication_routes);

    // middleware for verifying token
    app.use("/api", protectApiRoutes);
    app.use("/api/tasks", tasks_routes);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
}

startServer();
