import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export class Database {
  private readonly connectionString = `${process.env.MONGO_URI}`;

  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(this.connectionString);
      return console.log("Database connection successful");
    } catch (err) {
      console.error(`Database connection failed ${err}`);
      throw err;
    }
  }
}
