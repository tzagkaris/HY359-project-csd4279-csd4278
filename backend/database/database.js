const knex = require('knex');

let db = undefined;

function connect() {

    return knex({
        client: 'sqlite3',
        connection: {
            filename: process.cwd() + '/database/database.sqlite3'
        },
        useNullAsDefault: true
    })
}

function initialize() {
    db = connect();
}

function getDb() {
    return db;
}

module.exports = { initialize, getDb }