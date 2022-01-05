const knex = require('knex');

let db = undefined;

async function connect() {

    return await knex({
        client: 'sqlite3',
        connection: {
            filename: process.cwd() + '/database/database.sqlite3'
        },
        useNullAsDefault: true
    })
}

async function initialize() {
    db = await connect();
}

function getDb() {
    return db;
}

module.exports = { initialize, getDb }