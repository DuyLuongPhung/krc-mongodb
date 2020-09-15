const DEV_MONGO_CONNECTION = `mongodb://root:example@localhost:27017/db-test`;

export const MONGODB_CONNECTION: string = process.env.MONGODB_CONNECTION || DEV_MONGO_CONNECTION;
