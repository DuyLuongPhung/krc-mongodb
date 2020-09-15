import { Document, Model } from "mongoose";

import { IDocument } from "../models";

export class BaseRepository<TPrimary, IEntity extends IDocument<TPrimary>> {
  private _model: Model<Document, {}>;

  public get BModel(): Model<Document, {}> {
    return this._model;
  }

  constructor(model: Model<Document, {}>) {
    this._model = model;
  }

  public count(query: any): Promise<number> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      BModel.count(query)
        .then((count) => resolve(count))
        .catch((err) => reject(err));
    });
  }

  public get(id: TPrimary): Promise<IEntity> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      BModel.findOne({ _id: id })
        .then((doc) => resolve(doc as IEntity))
        .catch((err) => reject(err));
    });
  }

  public insert(doc: IEntity): Promise<IEntity> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      const document = new BModel(doc);
      document
        .save()
        .then((doc) => resolve(doc as IEntity))
        .catch((err) => reject(err));
    });
  }

  public update(id: string, doc: IEntity): Promise<number> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      BModel.updateOne({ _id: id }, doc)
        .then((doc) => resolve(1))
        .catch((err) => reject(err));
    });
  }

  public findOneAndUpdate(query: object, doc: IEntity): Promise<number> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      BModel.updateOne(query, doc)
        .then((doc) => resolve(1))
        .catch((err) => reject(err));
    });
  }

  public delete(id: string, softDelete?: boolean): Promise<number> {
    const { BModel } = this;

    if (softDelete) {
      return new Promise((resolve, reject) => {
        BModel.updateOne({ _id: id }, { active: false })
          .then((doc) => resolve(doc.ok))
          .catch((err) => reject(err));
      });
    }

    return new Promise((resolve, reject) => {
      BModel.deleteOne({ _id: id })
        .then((doc) => resolve(doc.ok))
        .catch((err) => reject(err));
    });
  }

  public find(query: object, page?: number, limit?: number, sort?: object): Promise<IEntity[]> {
    const { BModel } = this;

    let $result = BModel.find(query);

    if (sort != null) {
      $result = $result.sort(sort);
    }

    if (page != null && limit != null) {
      $result = $result.skip(page * limit).limit(limit);
    }

    return new Promise((resolve, reject) => {
      $result
      .then((docs) => resolve(docs as IEntity[]))
      .catch((err) => reject(err));
    });
  }

  public findAll(): Promise<IEntity[]> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      BModel.find({})
        .then((docs) => resolve(docs as IEntity[]))
        .catch((err) => reject(err));
    });
  }

  public findOne(query): Promise<IEntity> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      BModel.findOne(query)
        .then((docs) => resolve(docs as IEntity))
        .catch((err) => reject(err));
    });
  }

  public findById(id: TPrimary): Promise<IEntity> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      BModel.findById(id)
        .then((docs) => resolve(docs as IEntity))
        .catch((err) => reject(err));
    });
  }

  public findOneAndUpdateProperty(query: object, doc: object): Promise<IEntity> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      BModel.findOneAndUpdate(query, doc)
        .then((docs) => resolve(docs as IEntity))
        .catch((err) => reject(err));
    });
  }

  public findDistinct(field: string): Promise<TPrimary[]> {
    const { BModel } = this;

    return new Promise((resolve, reject) => {
      BModel.distinct(field)
        .then((docs) => resolve(docs as TPrimary[]))
        .catch((err) => reject(err));
    });
  }
}

export const Repository = function <TPrimary, IEntity extends IDocument<TPrimary>>(
  model: Model<Document, {}>
): BaseRepository<TPrimary, IEntity> {
  return new BaseRepository<TPrimary, IEntity>(model);
};
