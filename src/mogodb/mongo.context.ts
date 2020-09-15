import { connect, ConnectionOptions } from "mongoose";

import { MONGODB_CONNECTION } from "../common";

export const connectMongoDb = async () => {
  try {
    const options: ConnectionOptions = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };
    await connect(MONGODB_CONNECTION, options);

    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
