const { Client } = require('pg');

const client = new Client({
    user: "postgres",
    host: "localhost",
    database: "eventp",
    password: "password",
    port: 5432,
    idle_timeout: 5,
});

client
    .connect()
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error('Connection error:', err.stack));

module.exports = client;