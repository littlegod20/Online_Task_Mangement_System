import mongoose from "mongoose";

export class Database {
  private readonly localhost = "127.0.0.1";
  private readonly server = `${this.localhost}:27017`;
  private readonly databaseName = "task_management";
  private readonly connectionString = `mongodb://${this.server}/${this.databaseName}`;

  constructor() {
    this._connect();
    // this._disconnect();
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

  // async _disconnect() {
  //   try {
  //     await mongoose.disconnect();
  //     return console.log("Database disconnection successful");
  //   } catch (err) {
  //     console.log(`Database connection failed ${err}`);
  //     throw err;
  //   }
  // }
}
