"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const db = require('../database/dbconfig');
const add = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const [id] = yield db('users').insert(user);
    return findById(id);
});
const findBy = (filter) => {
    return db('users').where(filter);
};
const findById = (id) => {
    return db('users').where({ id }).first();
};
const removeById = (id) => {
    return db('users').where({ id }).delete();
};
module.exports = {
    add,
    findBy,
    findById,
    removeById
};
