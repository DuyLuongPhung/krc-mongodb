import { Document } from "mongoose";

export class IDocument<T> extends Document {
  id?: T;
}
