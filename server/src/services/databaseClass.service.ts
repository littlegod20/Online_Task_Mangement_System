import mongoose from "mongoose";
import { logger } from "../logger";

export class Database {
  private readonly connectionString = `${process.env.MONGO_URI}`;

  async _connect() {
    try {
      await mongoose.connect(this.connectionString);
      logger.info("Database connection successful");
    } catch (err) {
      logger.error("Database connection failed", err);
      throw err;
    }
  }
}
