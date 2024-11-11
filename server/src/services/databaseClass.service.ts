import mongoose from "mongoose";

export class Database {
  private readonly connectionString = `mongodb+srv://theophilusfrimpong17:doBKnUAzF7TXdPUp@cluster0.rajps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
