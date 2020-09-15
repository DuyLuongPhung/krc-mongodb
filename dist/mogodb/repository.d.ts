import { Document, Model } from "mongoose";
import { IDocument } from "../models";
export declare class BaseRepository<TPrimary, IEntity extends IDocument<TPrimary>> {
    private _model;
    get BModel(): Model<Document, {}>;
    constructor(model: Model<Document, {}>);
    count(query: any): Promise<number>;
    get(id: TPrimary): Promise<IEntity>;
    insert(doc: IEntity): Promise<IEntity>;
    update(id: string, doc: IEntity): Promise<number>;
    findOneAndUpdate(query: object, doc: IEntity): Promise<number>;
    delete(id: string, softDelete?: boolean): Promise<number>;
    find(query: object, page?: number, limit?: number, sort?: object): Promise<IEntity[]>;
    findAll(): Promise<IEntity[]>;
    findOne(query: any): Promise<IEntity>;
    findById(id: TPrimary): Promise<IEntity>;
    findOneAndUpdateProperty(query: object, doc: object): Promise<IEntity>;
    findDistinct(field: string): Promise<TPrimary[]>;
}
export declare const Repository: <TPrimary, IEntity extends IDocument<TPrimary>>(model: Model<Document, {}>) => BaseRepository<TPrimary, IEntity>;
