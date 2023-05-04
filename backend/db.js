const { Sequelize } = require('sequelize');
//const sequelize = new Sequelize('postgres://user:newuser:5432/test') // Example for postgres

const sequelize = new Sequelize('test', 'newuser', 'newpassword', {
    host: 'localhost',
    dialect: 'postgres'
});

// const { Client } = require('pg');
// const client = new Client({
//   user: 'newuser',
//   host: 'localhost',
//   database: 'test',
//   password: 'newpassword',
//   port: 5432,
// });

// client.connect();

module.exports = sequelize;