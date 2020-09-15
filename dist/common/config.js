"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_CONNECTION = void 0;
var DEV_MONGO_CONNECTION = "mongodb://root:example@localhost:27017/db-test";
exports.MONGODB_CONNECTION = process.env.MONGODB_CONNECTION || DEV_MONGO_CONNECTION;
//# sourceMappingURL=config.js.map