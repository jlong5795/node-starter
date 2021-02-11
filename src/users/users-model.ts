const db = require('../database/dbconfig');


const add = async(user: User) => {
    const [id] = await db('users').insert(user);

    return findById(id);
}

const findBy = (filter: {}) => {
    return db('users').where(filter)
}

const findById = (id: string) => {
    return db('users').where({ id }).first();
}

const removeById = (id: string) => {
    return db('users').where({ id }).delete();
}

module.exports = {
    add,
    findBy,
    findById,
    removeById
};