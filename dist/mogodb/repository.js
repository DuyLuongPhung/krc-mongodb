"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = exports.BaseRepository = void 0;
var BaseRepository = /** @class */ (function () {
    function BaseRepository(model) {
        this._model = model;
    }
    Object.defineProperty(BaseRepository.prototype, "BModel", {
        get: function () {
            return this._model;
        },
        enumerable: false,
        configurable: true
    });
    BaseRepository.prototype.count = function (query) {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            BModel.count(query)
                .then(function (count) { return resolve(count); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.get = function (id) {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            BModel.findOne({ _id: id })
                .then(function (doc) { return resolve(doc); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.insert = function (doc) {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            var document = new BModel(doc);
            document
                .save()
                .then(function (doc) { return resolve(doc); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.update = function (id, doc) {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            BModel.updateOne({ _id: id }, doc)
                .then(function (doc) { return resolve(1); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.findOneAndUpdate = function (query, doc) {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            BModel.updateOne(query, doc)
                .then(function (doc) { return resolve(1); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.delete = function (id, softDelete) {
        var BModel = this.BModel;
        if (softDelete) {
            return new Promise(function (resolve, reject) {
                BModel.updateOne({ _id: id }, { active: false })
                    .then(function (doc) { return resolve(doc.ok); })
                    .catch(function (err) { return reject(err); });
            });
        }
        return new Promise(function (resolve, reject) {
            BModel.deleteOne({ _id: id })
                .then(function (doc) { return resolve(doc.ok); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.find = function (query, page, limit, sort) {
        var BModel = this.BModel;
        var $result = BModel.find(query);
        if (sort != null) {
            $result = $result.sort(sort);
        }
        if (page != null && limit != null) {
            $result = $result.skip(page * limit).limit(limit);
        }
        return new Promise(function (resolve, reject) {
            $result
                .then(function (docs) { return resolve(docs); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.findAll = function () {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            BModel.find({})
                .then(function (docs) { return resolve(docs); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.findOne = function (query) {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            BModel.findOne(query)
                .then(function (docs) { return resolve(docs); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.findById = function (id) {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            BModel.findById(id)
                .then(function (docs) { return resolve(docs); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.findOneAndUpdateProperty = function (query, doc) {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            BModel.findOneAndUpdate(query, doc)
                .then(function (docs) { return resolve(docs); })
                .catch(function (err) { return reject(err); });
        });
    };
    BaseRepository.prototype.findDistinct = function (field) {
        var BModel = this.BModel;
        return new Promise(function (resolve, reject) {
            BModel.distinct(field)
                .then(function (docs) { return resolve(docs); })
                .catch(function (err) { return reject(err); });
        });
    };
    return BaseRepository;
}());
exports.BaseRepository = BaseRepository;
exports.Repository = function (model) {
    return new BaseRepository(model);
};
//# sourceMappingURL=repository.js.map